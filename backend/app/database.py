from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Declare the base class for ORM models
Base = declarative_base()