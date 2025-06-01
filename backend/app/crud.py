from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash

def get_services(db: Session):
    return db.query(models.Service).all()

def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user