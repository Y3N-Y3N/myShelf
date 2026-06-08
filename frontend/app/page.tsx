"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



export default function HomePage() {
  // MOCK auth state (replace later with real auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/searchResults?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false)
        return;
      }
      
      console.log("Token:", token);

      const res = await fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const curr_user = await res.json();
      setIsLoggedIn(true);
      setName(curr_user.name);
    }

    getUser();
  }, []);
  
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold tracking-wide">
            MyShelf
          </h1>
          { isLoggedIn &&
            <button
                onClick={handleLogout}
                className="bg-[#8bbf9f] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition"
              >
                Logout
            </button> }
        </header>

        {/* Hero */}
        <section className="mb-10 bg-[#D6BA73]/70 border border-[#d6ba73]/40 rounded-3xl px-6 py-6 shadow-sm flex items-center justify-between gap-6">
                  
          {/* Left content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {isLoggedIn ? `Hey ${name}!` : "Welcome!"}
            </h2>

            <p className="text-sm md:text-base opacity-80 max-w-xl leading-relaxed">
              Search and save your favourite books or check out what your friends are reading
            </p>

            <p className="text-sm md:text-base opacity-80 max-w-xl leading-relaxed mt-2">
              {isLoggedIn ? (
                <b>Welcome back :D</b>
              ) : (
                <b>Login to save books and access book recommendations</b>
              )}
            </p>
          </div>

          {/* Right image */}
          <div className="hidden md:block">
            <img
              src="/vecteezy_coffee.png"
              className="w-40 h-40 object-contain"
            />
          </div>

        </section>

        {/* Search Bar */}
        <div className="flex gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
            placeholder="Search books, authors..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/70 border border-[#d6ba73]/40 outline-none focus:border-[#8bbf9f]"
          />
        </div>
        
        <div className="flex justify-center gap-10">
        <button
            onClick={() => {
            if (isLoggedIn) {
                router.push("/shelf")
            } else {
                router.push("/auth/login")
            }
            }}
            className="bg-[#8bbf9f] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
            {isLoggedIn ? "Continue to shelf ->": "Login"}
        </button>
        {isLoggedIn &&
          <button onClick={() => { router.push("/recommendations/12345") } }
            className="bg-[#8bbf9f] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition">
              Find me a book!
          </button>
        }
        </div>
        
      </div>
    </main>
  );
}
