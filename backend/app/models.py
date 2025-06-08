from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    url = Column(String, unique=True, nullable=False)
    icon = Column(String, default="")
    tag = Column(String, default="")
    healthy = Column(Boolean, default=True)
    
class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True, index=True)
    hashed_password = Column(String, nullable=False)