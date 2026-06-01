from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.savedBooks import SavedBook
from app.schemas.book import SavedBookCreate, SavedBookResponse

router = APIRouter(prefix="/saved-books", tags=["Saved Books"])


@router.post("/", response_model=SavedBookResponse)
def save_book(book: SavedBookCreate, db: Session = Depends(get_db)):
    new_book = SavedBook(**book.model_dump())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    
    return new_book
