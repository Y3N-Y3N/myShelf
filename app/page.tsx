"use client";

import { useState } from "react";

export default function HomePage() {
  // MOCK auth state (replace later with real auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = { name: "Alex" }; 

  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold tracking-wide">
            myShelf
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="border px-5 py-2 rounded-full text-base font-medium hover:bg-black/5 transition"
            >
              {isLoggedIn ? "Log out" : "Log in"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {isLoggedIn ? `Hey ${user.name}!` : "Welcome!"}
          </h2>
          <p className="text-sm md:text-base opacity-80 max-w-xl leading-relaxed">
            Search and save your favourite books or check out what your friends are reading!
          </p>

          <button className="flex items-center mt-4 gap-2 bg-[#d6ba73] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition hover:scale-105 active:scale-95">
            <span className="text-lg">＋</span>
            <span className="font-medium">Add Book</span>
          </button>
        </section>

        {/* Search */}
        <div className="mb-10">
          <div className="flex items-center bg-white/70 border border-[#d6ba73]/40 rounded-2xl px-4 py-3">
            <input
              placeholder="Search books, authors, genres..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* 🔒 BOOKS SECTION (ONLY IF LOGGED IN) */}
        {isLoggedIn ? (
          <section>
            <h3 className="text-lg font-semibold mb-4">Your Books</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/70 border border-[#8bbf9f]/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-32 rounded-xl bg-[#8bbf9f]/30 mb-3" />

                  <h4 className="font-semibold">
                    Book Title {i + 1}
                  </h4>
                  <p className="text-xs opacity-70">Author Name</p>

                  <div className="mt-3 flex justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#d6ba73]/30">
                      Reading
                    </span>

                    <button className="text-xs text-[#8bbf9f]">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center mt-10 opacity-70">
            🔒 Log in to view your books
          </div>
        )}

        {/* Floating CTA */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-[#8bbf9f] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition">
            Find me a book
          </button>
        </div>
      </div>
    </main>
  );
}
