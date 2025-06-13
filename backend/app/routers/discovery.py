# app/routers/discovery.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..discovery.nmap_scan import scan_local_network
from ..discovery.mdns_listener import discover_mdns_services
from ..crud import store_discovered_services

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/discover/nmap")
def discover_nmap_services(db: Session = Depends(get_db)):
    discovered = scan_local_network() + discover_mdns_services() # returns list of dicts
    store_discovered_services(db, discovered)
    return {"found": len(discovered)}