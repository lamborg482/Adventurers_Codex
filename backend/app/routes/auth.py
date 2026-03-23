from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import schemas
from app.models import model_user
from app.database import get_db
from app.services.auth import get_password_hash, verify_password, create_access_token, decode_token
from typing import Optional

router = APIRouter(prefix="/auth", tags=["authentication"])

# Регистрация
@router.post("/register", response_model=schemas.UserOut)
async def register(user_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    # Проверяем, существует ли пользователь с таким username или email
    result = await db.execute(
        select(model_user.User).where(
            (model_user.User.username == user_data.username) | (model_user.User.email == user_data.email)
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    # Хешируем пароль
    hashed = get_password_hash(user_data.password)

    # Создаем пользователя
    new_user = model_user.User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user

# Логин (получение токена)
@router.post("/login", response_model=schemas.Token)
async def login(login_data: schemas.UserLogin, db: AsyncSession = Depends(get_db)):
    # Ищем пользователя по username или email
    query = None
    if login_data.username:
        query = select(model_user.User).where(model_user.User.username == login_data.username)
    elif login_data.email:
        query = select(model_user.User).where(model_user.User.email == login_data.email)
    else:
        raise HTTPException(status_code=400, detail="Username or email required")

    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Создаем токен
    access_token = create_access_token(data={"sub": user.username, "id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

# Получение информации о текущем пользователе (защищённый маршрут)
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    result = await db.execute(select(model_user.User).where(model_user.User.id == token_data.user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.get("/me", response_model=schemas.UserOut)
async def read_users_me(current_user: model_user.User = Depends(get_current_user)):
    return current_user