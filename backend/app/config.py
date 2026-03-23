import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:0180@localhost:6666/Adventurers_Codex")
    SECRET_KEY = os.getenv("SECRET_KEY", "йцкйцкйцкйцкйцкйцкйцксфчссsfasfasfasfasfasf@@@NJNN$@INN")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30  # время жизни токена