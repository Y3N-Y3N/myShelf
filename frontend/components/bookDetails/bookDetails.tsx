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
  const [popup, setPopup] = useState<{
    message: string; 
    type: "success" | "error" | null;
    visible: boolean;}
    | null>(null);

  async function getAuthorName(authorKey: string) {
    if (!authorKey) return "Unknown Author";

    const res = await fetch(`https://openlibrary.org${authorKey}.json`);
    const data = await res.json();

    return data?.name || "Unknown Author";
  }

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ message, type, visible: true });
    
    setTimeout(() => {
      setPopup((prev) => (prev ? { ...prev, visible: false } : null));
    }, 1500);

    setTimeout(() => {
      setPopup(null);
    }, 2000); 
  };

  const saveBook = async (book: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login")
      return;
    }
    
    console.log(book);

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
          genre: book.genre || book.category || "General",
          author: book.author,
          cover_url: book.cover_url,
          external_id: book.external_id,
        }),
      });

      if (!res.ok) {
        console.log("Failed to save book");
        showPopup("Book already saved!", "error");
      } else {
        setStatus("saved");
        showPopup("Book Saved!", "success");
      }
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  async function mapOpenLibraryBook(data: any) {
    console.log(data);
    return {
      external_id: data.key || "unknown", 

      title: data.title || "Unknown Title",

      author:
        (await getAuthorName(data.authors?.[0]?.author?.key)) ||
        "Unknown Author",

      genre: data.subjects?.[0] || "General",

      description: typeof data.description === "string"
        ? data.description
        : data.description?.value || "No description available",

      year: data.created?.value
        ? new Date(data.created.value).getFullYear().toString() 
        : "Unknown",

      cover_url: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        : null,
    };
  }
  
  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://openlibrary.org/works/${id}.json`
      );

      const data = await res.json();
      const mappedBook = await mapOpenLibraryBook(data);
      console.log(mappedBook);
      setBook(mappedBook);
    }

    fetchBook();
  }, [id]);

  if (!book) {
    return;
  }


  return (
    <main className="min-h-screen bg-[#f5e0b7] text-[#4a4542] px-6 py-10">
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
          
          <div
            className={`px-6 py-3 rounded-2xl shadow-lg text-white text-sm font-medium transition-all duration-300
              ${popup.type === "success" ? "bg-[#8bbf9f]" : "bg-red-300"}
              ${popup.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}
          >
            {popup.message}
          </div>

        </div>
      )}

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
                  disabled={!book}
                  onClick={() => saveBook(book)}
                  className="w-full bg-[#8bbf9f] text-white py-3 rounded-2xl font-medium shadow-sm hover:shadow-md hover:bg-[#7aac94] transition">
                  Save to Shelf
                </button>

                {/* Status */}
                <div className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#d6ba73]/30 text-sm text-center font-medium">
                  {status || "Not Saved"}
                </div>
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
                  {book.genre}
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