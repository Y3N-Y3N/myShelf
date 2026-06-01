from typing import ForwardRef

from sqlalchemy import Column, Integer, Table, String, ForeignKey
from app.database.database import Base

saved_books = Table(
    "saved_books",
    Base.metadata,
    Column("user_id", ForeignKey("users.id")),
    Column("book_id", ForeignKey("books.id")),
)
    
