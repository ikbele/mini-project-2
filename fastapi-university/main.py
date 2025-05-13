from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import students, departments, formations  # on ne met pas stats ici
from app.database import Base, engine, SessionLocal
from app.models import Etudiant, Departement, Formation
import logging

# Création des tables
try:
    Base.metadata.create_all(bind=engine)
    print("Les tables ont été créées avec succès.")
except Exception as e:
    print(f"Erreur lors de la création des tables : {e}")

# Initialisation de FastAPI
app = FastAPI(title="API Étudiants Université")

origins = [
    "http://localhost:61566",  # ou le port de ton frontend Angular
    "http://localhost:4200",   # pour Angular par défaut
]

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # à sécuriser plus tard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes
app.include_router(students.router)
app.include_router(departments.router)
app.include_router(formations.router)

# ✅ Route de statistiques (à séparer dans stats.py plus tard)
@app.get("/stats")
def get_stats():
    db = SessionLocal()
    try:
        nb_etudiants = db.query(Etudiant).count()
        nb_departements = db.query(Departement).count()
        nb_formations = db.query(Formation).count()
        return {
            "nombre_etudiants": nb_etudiants,
            "nombre_departements": nb_departements,
            "nombre_formations": nb_formations
        }
    finally:
        db.close()

# Route de bienvenue
@app.get("/")
def read_root():
    return {"message": "Bienvenue à l'API des étudiants 🚀"}
