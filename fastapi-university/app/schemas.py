from pydantic import BaseModel, EmailStr
from typing import List, Optional

# === Étudiant ===

class EtudiantBase(BaseModel):
   nom: str
   email: str
   mot_de_passe: str

class EtudiantCreate(EtudiantBase):
    password: str  # Mot de passe pour l'inscription
    departement_id: Optional[int] = None  # Optionnel ou requis selon ton modèle

class Etudiant(EtudiantBase):
    id: int
    departement_id: Optional[int] = None
    formations: Optional[List["Formation"]] = []  # Pour renvoyer les formations inscrites

    class Config:
        orm_mode = True

# === Département ===

class DepartementBase(BaseModel):
    nom: str
    class Config:
        from_attributes = True

class Departement(DepartementBase):
    id: int

    class Config:
        from_attributes = True

# === Formation ===

class FormationBase(BaseModel):
    nom: str

class Formation(FormationBase):
    id: int

    class Config:
        orm_mode = True

# Pour gérer les références croisées (étudiant <-> formations)
Etudiant.update_forward_refs()
