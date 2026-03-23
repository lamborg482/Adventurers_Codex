from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.creature import Creature
from app.schemas.schemas import CreatureCreate, CreatureOut
from app.routes.auth import get_current_user
from app.models.model_user import User
from typing import List

router = APIRouter(prefix="/creatures", tags=["creatures"])

@router.post("/", response_model=CreatureOut, status_code=status.HTTP_201_CREATED)
async def create_creature(
    creature_data: CreatureCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Создать новое существо в бестиарии текущего пользователя"""
    new_creature = Creature(
        user_id=current_user.id,
        **creature_data.dict()
    )
    db.add(new_creature)
    await db.commit()
    await db.refresh(new_creature)
    return new_creature

@router.get("/", response_model=List[CreatureOut])
async def get_my_creatures(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить список всех существ текущего пользователя"""
    result = await db.execute(
        select(Creature).where(Creature.user_id == current_user.id).order_by(Creature.name)
    )
    creatures = result.scalars().all()
    return creatures

@router.get("/{creature_id}", response_model=CreatureOut)
async def get_creature(
    creature_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить одно существо по id"""
    result = await db.execute(select(Creature).where(Creature.id == creature_id))
    creature = result.scalar_one_or_none()
    if not creature:
        raise HTTPException(status_code=404, detail="Creature not found")
    if creature.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your creature")
    return creature

@router.put("/{creature_id}", response_model=CreatureOut)
async def update_creature(
    creature_id: int,
    creature_data: CreatureCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить существо"""
    result = await db.execute(select(Creature).where(Creature.id == creature_id))
    creature = result.scalar_one_or_none()
    if not creature:
        raise HTTPException(status_code=404, detail="Creature not found")
    if creature.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your creature")

    for key, value in creature_data.dict().items():
        setattr(creature, key, value)
    await db.commit()
    await db.refresh(creature)
    return creature

@router.delete("/{creature_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_creature(
    creature_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить существо"""
    result = await db.execute(select(Creature).where(Creature.id == creature_id))
    creature = result.scalar_one_or_none()
    if not creature:
        raise HTTPException(status_code=404, detail="Creature not found")
    if creature.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your creature")
    await db.delete(creature)
    await db.commit()