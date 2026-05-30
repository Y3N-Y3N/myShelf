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
      <div className="max-w-3xl text-left">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl text-left font-bold mb-2">
            Recommendations for Steve
          </h1>
          <p className="text-medium text-left opacity-70">
            Books based on your reading taste
          </p>
        </header>
      </div>

        {/* Book List */}
        <section className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {books.map((book) => (
            <div
                key={book.id}
                onClick={() => router.push(`/bookDetails/${book.title}`)}
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
                <div className="flex items-center gap-2 text-xs flex-wrap">
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
        </section>
      <button
        onClick={() => router.push("/")}
        className="absolute top-15 right-20 px-3 py-3 rounded-full bg-[#8bbf9f] border border-[#d6ba73]/30 text-sm text-white shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
      >
        Back to menu
      </button>
    </main>
  );
}