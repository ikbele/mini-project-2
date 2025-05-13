from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Departement as DepartementModel
from app.schemas import Departement as DepartementSchema, DepartementBase
 
router = APIRouter(prefix="/departements", tags=["Départements"])

@router.get("/", response_model=List[DepartementSchema], summary="Récupérer tous les départements")
def get_departements(db: Session = Depends(get_db)):
    return db.query(DepartementModel).all()

@router.post("/", response_model=DepartementSchema, summary="Créer un département")
def create_departement(departement: DepartementBase, db: Session = Depends(get_db)):
    # Vérifie si le nom du département existe déjà
    existing = db.query(DepartementModel).filter(DepartementModel.nom == departement.nom).first()
    if existing:
        raise HTTPException(status_code=400, detail="Le département existe déjà")
    
    new_dep = DepartementModel(**departement.dict())
    db.add(new_dep)
    db.commit()
    db.refresh(new_dep)
    return new_dep
