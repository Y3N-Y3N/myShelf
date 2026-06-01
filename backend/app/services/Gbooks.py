import httpx

OPEN_LIBRARY_URL = "https://openlibrary.org/search.json"

async def search_books(query: str, search_type: str, limit: int = 10):
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
        res = await client.get(OPEN_LIBRARY_URL, params=params)
        data = res.json()

    results = []

    # returns a list of books which match the search
    for item in data.get("docs", [])[:limit]:
        results.append({
            "external_id": item.get("key"),
            "title": item.get("title"),
            "author": item.get("author_name", [None])[0] if item.get("author_name") else None,
            "cover_url": (
                f"https://covers.openlibrary.org/b/id/{item['cover_i']}-M.jpg"
                if item.get("cover_i")
                else None
            )
        })


    return results