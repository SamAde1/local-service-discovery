from fastapi import FastAPI
from .database import Base, engine
from .routers import services, auth as auth_router, discovery
from fastapi.middleware.cors import CORSMiddleware

# Automatically create the tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router.router, prefix="/api", tags=["auth"])
app.include_router(services.router, prefix="/api", tags=["services"])
app.include_router(discovery.router, prefix="/api", tags=["discovery"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)