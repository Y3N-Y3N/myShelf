"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  givenBook: string;
};

export default function BookDetailsPage({ givenBook }: Props) {
  const router = useRouter();

  // Mock book data
  const book = {
    title: givenBook.replace("%20", " "),
    author: "James Clear",
    category: "Self-Help",
    year: 2018,
    description:
      "Atomic Habits explores how tiny daily improvements and systems can create remarkable long-term growth. The book focuses on building good habits, breaking bad ones, and mastering consistent behaviour.",
    reviews: [
      "A genuinely motivating and practical read.",
      "Easy to understand and surprisingly actionable.",
      "One of the best productivity books I’ve read.",
    ],
  };

  const [status, setStatus] = useState("saved");

  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 rounded-full bg-white/60 border border-[#d6ba73]/30 text-sm hover:bg-white/80 transition"
        >
          ← Back
        </button>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-3xl p-6 md:p-8 shadow-sm">

          <div className="grid md:grid-cols-[260px_1fr] gap-8">

            {/* Left Side */}
            <div>
              {/* Cover */}
              <div className="h-[360px] rounded-3xl bg-gradient-to-br from-[#8bbf9f]/60 to-[#d6ba73]/50 shadow-sm flex items-end p-5">
                <h1 className="text-2xl font-bold text-white leading-tight">
                  {book.title}
                </h1>
              </div>

              {/* Actions */}
              <div className="mt-5 space-y-3">

                {/* Save button */}
                <button className="w-full bg-[#8bbf9f] text-white py-3 rounded-2xl font-medium shadow-sm hover:shadow-md hover:bg-[#7aac94] transition">
                  Save to Shelf
                </button>

                {/* Dropdown */}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#d6ba73]/30 outline-none text-sm"
                >
                  <option value="saved">Saved</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>

            {/* Right Side */}
            <div>

              {/* Title */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">
                  {book.title}
                </h1>

                <p className="text-lg opacity-75">
                  by {book.author}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <span className="px-4 py-2 rounded-full bg-[#8bbf9f]/20 text-sm">
                  {book.category}
                </span>

                <span className="px-4 py-2 rounded-full bg-[#d6ba73]/30 text-sm">
                  {book.year}
                </span>
              </div>

              {/* Description */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  Description
                </h2>

                <p className="leading-relaxed opacity-80">
                  {book.description}
                </p>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Reviews
                </h2>

                <div className="space-y-4">
                  {book.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="bg-white/70 border border-[#d6ba73]/20 rounded-2xl p-4"
                    >
                      <p className="text-sm leading-relaxed opacity-80">
                        “{review}”
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}