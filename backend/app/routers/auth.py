from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..database import SessionLocal
from .. import crud, schemas, auth
from ..models import User

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency to get current user
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    from jose import JWTError, jwt
    from ..auth import SECRET_KEY, ALGORITHM

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user(db, username=username)
    if user is None:
        raise credentials_exception
    return user


@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}