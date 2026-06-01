from pydantic import BaseModel
from typing import Optional

class SavedBookCreate(BaseModel):
    external_id: str
    title: str
    author: str
    cover_url: Optional[str] = None

class SavedBookUpdate(BaseModel):
    status: str | None = None
    rating: int | None = None

class SavedBookResponse(BaseModel):
    id: int
    external_id: str
    title: str
    author: str
    cover_url: str | None
    status: str
    rating: int | None

    class Config:
        from_attributes = True
        