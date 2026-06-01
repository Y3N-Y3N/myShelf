from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.savedBooks import SavedBook
from app.schemas.book import SavedBookCreate, SavedBookResponse, SavedBookUpdate


router = APIRouter(prefix="/saved-books", tags=["Saved Books"])

# POST /saved-books (addes a saved book)
@router.post("/", response_model=SavedBookResponse)
def save_book(book: SavedBookCreate, db: Session = Depends(get_db)):
    new_book = SavedBook(**book.model_dump())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book

# GET /saved-books (gets all saved books)
@router.get("/", response_model=list[SavedBookResponse])
def get_saved_books(db: Session = Depends(get_db)):
    return db.query(SavedBook).all()

# GET /saved-books/:book_id (gets information about a specific saved book)
@router.get("/{book_id}", response_model=SavedBookResponse)
def get_saved_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(SavedBook).filter(SavedBook.id == book_id).first()

    if not book:
        raise HTTPException(status_code=404, detail="Saved book not found")

    return book

# PATCH /saved-books/:book_id (Updates the information of a specific saved book)
@router.patch("/{book_id}", response_model=SavedBookResponse)
def update_saved_book(book_id: int, data: SavedBookUpdate, db: Session = Depends(get_db)):
    book = db.query(SavedBook).filter(SavedBook.id == book_id).first()

    if not book:
        return {"error": "Not found"}

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)

    return book

# DELETE /saved-books/:book_id (Deletes a book from the saved books)
@router.delete("/{book_id}")
def delete_saved_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(SavedBook).filter(SavedBook.id == book_id).first()

    if not book:
        return {"error": "Not found"}

    db.delete(book)
    db.commit()

    return {"message": "deleted"}