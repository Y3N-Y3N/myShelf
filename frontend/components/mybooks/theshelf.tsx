"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BookStatus = "saved" | "read" | "reading";

type Book = {
  id: 0,
  external_id: string,
  genre: string
  title: string,
  year: string,
  author: string,
  cover_url: string,
  status: BookStatus | "all",
  rating: 0
};

export default function MyBooksPage() {
  const [filter, setFilter] = useState<"all" | BookStatus>("all");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  
  async function retrieveBooks(): Promise<Book[]> {

  
    const res = await fetch("http://localhost:8000/saved-books/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      console.log("Failed to save book");
      return [];
    }
    
    let list = await res.json();
    return list;
  }

  useEffect(() => {
    const loadBooks = async () => {
      const data = await retrieveBooks();
      setBooks(data);
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {


    const bookSelection = books.filter((book: Book) => book.status === filter);
    if (filter === "all") {
      return books;
    }
    const query = search.toLowerCase();

    if (!query) {
      return bookSelection;
    } else {
      return bookSelection.filter((book) => {
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
      })
    }
  }, [filter, search]);
  
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section className="mb-10 text-left">
          <h1 className="text-3xl font-bold mb-2">
            My Shelf
          </h1>

          <p className="text-sm opacity-70">
            Track the books you’ve saved and finished reading
          </p>
        </section>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-8">
          {["all", "saved", "read"].map((option) => (
            <button
              key={option}
              onClick={() =>
                setFilter(option as "all" | "saved" | "read" | "reading")
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition border
                ${
                  filter === option
                    ? "bg-[#8bbf9f] text-white border-[#8bbf9f]"
                    : "bg-white/60 border-[#d6ba73]/30 hover:bg-white/80"
                }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="mb-8">
  <div className="flex items-center bg-white/70 border border-[#d6ba73]/40 rounded-2xl px-4 py-3 shadow-sm">
    
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search books, authors, genres..."
      className="w-full bg-transparent outline-none text-sm"
    />

    <span className="text-[#8bbf9f] text-sm">🔍</span>
  </div>
</div>
        {/* GRID BOOKS (refactored design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                router.push(`/bookDetails/${book.title}`)
              }
              className="cursor-pointer bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-[#4a4542] mb-1">
                {book.title}
              </h2>

              {/* Author */}
              <p className="text-sm opacity-70 mb-3">
                {book.author}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-3 py-1 rounded-full bg-[#8bbf9f]/20 text-[#4a4542]">
                  {book.genre}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#d6ba73]/30 text-[#4a4542]">
                  {book.year}
                </span>
              </div>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      book.status === "read"
                        ? "bg-[#8bbf9f] text-white"
                        : "bg-[#d6ba73] text-white"
                    }`}
                >
                  {book.status === "read" ? "Read" : "Saved"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="mt-12 text-center opacity-70">
            No books found.
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-15 right-20 px-3 py-3 rounded-full bg-[#8bbf9f] border border-[#d6ba73]/30 text-medium text-white shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
      >
        Back to menu
      </button>
    </main>
  );
}