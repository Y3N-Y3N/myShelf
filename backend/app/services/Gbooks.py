import httpx

GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes"

async def search_books(query: str, search_type: str):
    params = {}

    if search_type == "author":
        params["q"] = f"inauthor:{query}"
    elif search_type == "book":
        params["q"] = f"intitle:{query}"
    else:
        params["q"] = query 

    params["maxResults"] = 10
    
    # request the books
    async with httpx.AsyncClient() as client:
        res = await client.get(GOOGLE_BOOKS_URL, params=params)
        data = res.json()

    results = []

    # returns a list of books which match the search
    for item in data.get("items", []):
        volume = item.get("volumeInfo", {})

        results.append({
            "external_id": item.get("id"),
            "title": volume.get("title"),
            "author": ", ".join(volume.get("authors", [])) if volume.get("authors") else None,
            "cover_url": volume.get("imageLinks", {}).get("thumbnail")
        })

    return results