"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BookStatus = "saved" | "read";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: BookStatus;
};

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    status: "read",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    year: 1965,
    status: "saved",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    year: 2016,
    status: "read",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    year: 1988,
    status: "saved",
  },
];

export default function MyBooksPage() {
  const [filter, setFilter] = useState<"all" | BookStatus>("all");

  const filteredBooks = useMemo(() => {
    if (filter === "all") return mockBooks;

    return mockBooks.filter((book) => book.status === filter);
  }, [filter]);

  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            My Shelf
          </h1>

          <p className="text-medium opacity-70">
            Track the books you’ve saved and finished reading
          </p>
        </section>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-8">
          {["all", "saved", "read"].map((option) => (
            <button
              key={option}
              onClick={() =>
                setFilter(option as "all" | "saved" | "read")
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

        {/* Books List */}
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left Side */}
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    {book.title}
                  </h2>

                  <p className="text-sm opacity-70 mb-3">
                    {book.author}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#8bbf9f]/20">
                      {book.genre}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs bg-[#d6ba73]/30">
                      {book.year}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
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
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 px-3 py-3 rounded-full bg-[#8bbf9f] border border-[#d6ba73]/30 text-sm text-white shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
      >
        Back to menu
      </button>
    </main>
  );
}