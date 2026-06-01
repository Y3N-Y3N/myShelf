from fastapi import APIRouter, Query
from app.services.Gbooks import search_books

router = APIRouter(prefix="/books", tags=["Books"])

@router.get("/search")
async def search_books_endpoint(
    q: str = Query(..., min_length=1),
    type: str = "book",
    limit: int = 10
):
    return await search_books(q, type, 10)

