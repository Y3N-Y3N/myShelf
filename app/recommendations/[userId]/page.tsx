"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  link: string;
};

export default function RecommendationsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    // mock data for now (replace with FastAPI later)
    setBooks([
      {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        year: 2018,
        link: "funkeelink.yay"
      },
      {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        year: 1965,
        link: "funkeelink.yay"
      },
      {
        id: 3,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        year: 1988,
        link: "funkeelink.yay"
      },
      {
        id: 4,
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        year: 2016,
        link: "funkeelink.yay"
      },
    ]);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Recommendations for Steve
          </h1>
          <p className="text-medium opacity-70">
            Books based on your reading taste
          </p>
        </header>

        {/* Book List */}
        <div className="space-y-4">
          {books.map((book) => (
            <div
              onClick={() => {
                router.push(`/books/details/${book.title}`)
              }}
              key={book.id}
              className="bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold mb-1">
                {book.title}
              </h2>

              {/* Meta info */}
              <p className="text-sm opacity-70 mb-3">
                {book.author}
              </p>

              {/* Tags row */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#8bbf9f]/20 text-[#4a4542]">
                  {book.genre}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#d6ba73]/30 text-[#4a4542]">
                  {book.year}
                </span>
              </div>
            </div>
          ))}
        </div>

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