from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Remplace avec tes vraies infos de connexion
DATABASE_URL = "postgresql://postgres:IKBELE1234@localhost:5432/university_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Fonction pour obtenir une session DB dans les routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
