"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  id: string;
};

export default function BookDetailsPage({ id }: Props) {
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [status, setStatus] = useState("");

  async function getAuthorName(authorKey: string) {
    if (!authorKey) return "Unknown Author";

    const res = await fetch(`https://openlibrary.org${authorKey}.json`);
    const data = await res.json();

    return data?.name || "Unknown Author";
  }

  const saveBook = async (book: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login")
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/saved-books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: book.title,
          year: book.year,
          genre: book.genre,
          author: book.author,
          cover_url: book.cover_url,
          external_id: book.external_id,
        }),
      });

      if (!res.ok) {
        console.log("Failed to save book");
        return;
      }

      setStatus("Saved")
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  function mapOpenLibraryBook(data: any) {
    return {
      title: data.title || "Unknown Title",

      author:
        getAuthorName(data.authors?.[0]?.author?.key) ||
        "Unknown Author",

      category:
        data.subjects?.[0] || "General",

      year: data.created?.value
        ? new Date(data.created.value).getFullYear()
        : "Unknown",

      description:
        "No description available from Open Library. This is a placeholder summary for display purposes.",

      cover_url: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        : null
    };
  }
  
  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://openlibrary.org/works/${id}.json`
      );

      const data = await res.json();
      console.log(data)
      setBook(mapOpenLibraryBook(data));
    }

    fetchBook();
  }, [id]);

  if (!book) {
    return;
  }


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
              <div className="h-[360px] rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={book?.cover_url || "/fallback-cover.jpg"}
                  alt={book?.title || "No cover"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Actions */}
              <div className="mt-5 space-y-3">

                {/* Save button */}
                <button 
                  onClick={() => saveBook(book)}
                  className="w-full bg-[#8bbf9f] text-white py-3 rounded-2xl font-medium shadow-sm hover:shadow-md hover:bg-[#7aac94] transition">
                  Save to Shelf
                </button>

                {/* Dropdown */}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#d6ba73]/30 outline-none text-sm"
                >
                  <option value="">Not Saved</option>
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

              {/* Reviews
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
              </section> */}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}