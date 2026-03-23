from fastapi import FastAPI
from app.routes import auth
from app.database import engine, Base
from app.database import engine
from app.models import model_user
from fastapi.middleware.cors import CORSMiddleware
from app.routes import creatures

app = FastAPI(title="Adventurers Codex API")

app.include_router(creatures.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # или ["*"] для разработки
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создание таблиц (для первого запуска)

@app.on_event("startup")
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(model_user.Base.metadata.create_all)

# Подключаем роутеры
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Adventurers Codex API"}