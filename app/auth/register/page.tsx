"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // fake signup for now
    if (name && email && password) {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5e0b7] text-[#4a4542] px-6">
      <div className="w-full max-w-md bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-3xl p-8 shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          MyShelf
        </h1>

        <p className="text-center text-sm opacity-70 mb-6">
          create an account to start building your shelf
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border border-[#d6ba73]/30 outline-none focus:border-[#8bbf9f] transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border border-[#d6ba73]/30 outline-none focus:border-[#8bbf9f] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border border-[#d6ba73]/30 outline-none focus:border-[#8bbf9f] transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#8bbf9f] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#76aa93] hover:shadow-lg transition focus:ring-2 focus:ring-[#8bbf9f] focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs mt-6 opacity-70">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-[#8bbf9f] cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </main>
  );
}