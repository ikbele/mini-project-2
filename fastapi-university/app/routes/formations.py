from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.models import Formation
from app.schemas import Formation as FormationSchema  # <-- modèle Pydantic
from app.database import get_db

router = APIRouter(prefix="/formations", tags=["Formations"])

@router.get("/", response_model=List[FormationSchema])
def get_formations(db: Session = Depends(get_db)):
    return db.query(Formation).all()
