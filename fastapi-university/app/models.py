from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class Etudiant(Base):
    __tablename__ = "etudiants"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nom: Mapped[str] = mapped_column(String, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    departement_id: Mapped[int] = mapped_column(ForeignKey("departements.id"))
    departement: Mapped["Departement"] = relationship("Departement", back_populates="etudiants")
    # Ajout d'une relation Formation si nécessaire
    formations: Mapped[list["Formation"]] = relationship("Formation", back_populates="etudiants")

class Departement(Base):
    __tablename__ = "departements"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nom: Mapped[str] = mapped_column(String, index=True)
    etudiants: Mapped[list["Etudiant"]] = relationship("Etudiant", back_populates="departement")

class Formation(Base):
    __tablename__ = "formations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nom: Mapped[str] = mapped_column(String, index=True)
    # Si vous voulez lier les étudiants à une formation, ajouter une relation ici
    etudiants: Mapped[list["Etudiant"]] = relationship("Etudiant", back_populates="formations")
