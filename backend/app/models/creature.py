from sqlalchemy import Column, Integer, String, ForeignKey, JSON, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Creature(Base):
    __tablename__ = "creatures"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(20), nullable=False)          # 'monster' или 'npc'
    cr = Column(String(10), nullable=True)             # '1/4', '5', и т.д.
    ac = Column(Integer, nullable=False)
    hp = Column(Integer, nullable=False)
    speed = Column(String(50), nullable=True)          # '30 фт', '40 фт'
    stats = Column(JSON, nullable=False)               # {str:10, dex:14, ...}
    actions = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    img_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())