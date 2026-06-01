from pydantic import BaseModel

# from frontend to backend payload
class BookCreate(BaseModel):
    title: str
    author: str
    genre: str | None = None

# from backend to frontend payload
class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    genre: str | None = None

    class Config:
        from_attributes = True

# from frontend to backend
class BookUpdate(BaseModel):
    title: str | None = None
    author: str | None = None
    genre: str | None = None