from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import List

from app.database import get_db
from app import models, schemas

# Initialize the router and password context
router = APIRouter(prefix="/etudiants", tags=["Étudiants"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔽 Récupérer tous les étudiants
@router.get("/", response_model=List[schemas.Etudiant])
def get_etudiants(db: Session = Depends(get_db)):
    return db.query(models.Etudiant).all()

# 🔽 Récupérer un étudiant par ID
@router.get("/{etudiant_id}", response_model=schemas.Etudiant)
def get_etudiant(etudiant_id: int, db: Session = Depends(get_db)):
    etu = db.query(models.Etudiant).filter(models.Etudiant.id == etudiant_id).first()
    if not etu:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    return etu

# 🔽 Ajouter un étudiant
@router.post("/", response_model=schemas.Etudiant)
def add_etudiant(etudiant: schemas.EtudiantCreate, db: Session = Depends(get_db)):
    new_etu = models.Etudiant(**etudiant.dict())
    db.add(new_etu)
    db.commit()
    db.refresh(new_etu)
    return new_etu

# 🔽 Mettre à jour un étudiant
@router.put("/{etudiant_id}", response_model=schemas.Etudiant)
def update_etudiant(etudiant_id: int, updated: schemas.EtudiantCreate, db: Session = Depends(get_db)):
    etu = db.query(models.Etudiant).filter(models.Etudiant.id == etudiant_id).first()
    if not etu:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    for key, value in updated.dict().items():
        setattr(etu, key, value)
    db.commit()
    db.refresh(etu)
    return etu

# 🔽 Supprimer un étudiant
@router.delete("/{etudiant_id}")
def delete_etudiant(etudiant_id: int, db: Session = Depends(get_db)):
    etu = db.query(models.Etudiant).filter(models.Etudiant.id == etudiant_id).first()
    if not etu:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    db.delete(etu)
    db.commit()
    return {"message": "Étudiant supprimé"}

# 🔽 Inscrire à une formation (associative table à gérer)
@router.post("/{etudiant_id}/formations/{formation_id}")
def inscrire_etudiant_formation(etudiant_id: int, formation_id: int, db: Session = Depends(get_db)):
    etu = db.query(models.Etudiant).filter(models.Etudiant.id == etudiant_id).first()
    formation = db.query(models.Formation).filter(models.Formation.id == formation_id).first()
    if not etu or not formation:
        raise HTTPException(status_code=404, detail="Étudiant ou Formation introuvable")

    if formation in etu.formations:
        return {"message": "Étudiant déjà inscrit à cette formation"}

    etu.formations.append(formation)
    db.commit()
    return {"message": "Inscription réussie"}

# 🔽 Fonction pour hasher le mot de passe
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# 🔽 Fonction pour vérifier le mot de passe (utile pour la connexion)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# 🔽 Inscription d'un étudiant (nouveau point d'API)
@router.post("/register", response_model=schemas.Etudiant)
def register_etudiant(etudiant: schemas.EtudiantCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(models.Etudiant).filter(models.Etudiant.email == etudiant.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email déjà utilisé")

        hashed_password = hash_password(etudiant.password)
        new_etudiant = models.Etudiant(
            nom=etudiant.nom,
            email=etudiant.email,
            password=hashed_password,
            departement_id=etudiant.departement_id  # <-- IMPORTANT si tu le stockes
        )

        db.add(new_etudiant)
        db.commit()
        db.refresh(new_etudiant)
        return new_etudiant

    except Exception as e:
        # Ceci va te donner une erreur visible dans Postman
        raise HTTPException(status_code=500, detail=f"Erreur serveur : {str(e)}")
