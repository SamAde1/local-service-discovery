from sqlalchemy.orm import Session
from .models import Service
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

def store_discovered_services(db: Session, services: list[dict]):
    """
    Store services discovered by Nmap into the DB.
    Skips services that already exist based on their URL.
    """
    for svc in services:
        ip = svc["ip"]
        port = svc["port"]
        service_name = svc.get("service", "unknown")

        url = f"http://{ip}:{port}"
        name = f"{service_name} ({ip})"
        
        # Check if the URL already exists
        existing = db.query(Service).filter(Service.url == url).first()
        if existing:
            continue
        
        new_service = Service(
            name=name,
            url=url,
            tag="nmap",
            icon="",  # You could later map common services to icons
            healthy=True
        )
        db.add(new_service)

    db.commit()