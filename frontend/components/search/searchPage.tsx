"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
  external_id: string;
  title: string;
  author: string;
  genre?: string;
  cover_url?: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/books/search?q=${query}&type=book&limit=10`
      );

      if (!res.ok) {
        console.error("Search failed");
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-semibold mb-6">Search Books</h1>

        {/* Search Bar */}
        <div className="flex gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchBooks();
              }
            }}
            placeholder="Search books, authors..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/70 border border-[#d6ba73]/40 outline-none focus:border-[#8bbf9f]"
          />

          <button
            onClick={searchBooks}
            className="bg-[#8bbf9f] text-white px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="opacity-70 mb-4">Searching books...</p>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((book) => (
            <div
              onClick={() => router.push(`/bookDetails/${book.external_id.replace("/works", "")}`)}
              key={book.external_id}
              className="flex gap-4 bg-white/70 border border-[#d6ba73]/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Cover */}
              <div className="w-20 h-28 bg-[#d6ba73]/30 rounded-lg overflow-hidden flex items-center justify-center">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs opacity-60 text-center">
                    No Cover
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg">
                    {book.title}
                  </h2>

                  <p className="text-sm opacity-80">
                    {book.author || "Unknown Author"}
                  </p>

                  <p className="text-xs mt-1 opacity-60">
                    {book.genre || "Unknown Genre"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loading && results.length === 0 && query && (
          <p className="mt-6 opacity-60">No books found.</p>
        )}

      </div>
    </main>
  );
}
