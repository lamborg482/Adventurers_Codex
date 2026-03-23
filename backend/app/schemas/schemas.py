from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict

# Схема для создания пользователя (регистрация)
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

# Схема для ответа (не возвращаем пароль)
class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True

# Схема для логина (может быть username или email)
class UserLogin(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: str

# Схема для токена
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Схема для данных из токена
class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None
    

class CreatureBase(BaseModel):
    name: str
    type: str
    cr: Optional[str] = None
    ac: int
    hp: int
    speed: Optional[str] = None
    stats: Dict[str, int]          # ключи: str, dex, con, int, wis, cha
    actions: Optional[str] = None
    description: Optional[str] = None
    img_url: Optional[str] = None

class CreatureCreate(CreatureBase):
    pass

from datetime import datetime
from typing import Optional

class CreatureOut(CreatureBase):
    id: int
    user_id: int
    created_at: Optional[datetime] = None  # или Optional[str], но лучше datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True