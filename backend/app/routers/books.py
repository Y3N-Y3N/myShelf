from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.book import Book
from app.schemas.book import BookCreate, BookResponse

router = APIRouter(prefix="/books", tags=["Books"])

# POST /books
@router.post("/", response_model=BookResponse)
def createBook(book: BookCreate, db: Session = Depends(get_db)):
    # initialise the book payload
    new_book = Book(**book.model_dump())

    db.add(new_book)
    db.commit()
    db.refresh()

    return new_book
