"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const login = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    if (!login.ok) {
      const error = await login.json();
      console.log(error)
      return;
    } 
    
    const loginData = await login.json();

    localStorage.setItem(
      "token",
      loginData.access_token
    );

    router.push("/")
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5e0b7] text-[#4a4542] px-6">
      <div className="w-full max-w-md bg-white/60 backdrop-blur border border-[#d6ba73]/30 rounded-3xl p-8 shadow-lg">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          MyShelf
        </h1>

        <p className="text-center text-sm opacity-70 mb-6">
          Sign in to access your shelf and save books
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
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
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border border-[#d6ba73]/30 outline-none focus:border-[#8bbf9f] transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#8bbf9f] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs mt-6 opacity-70">
          Don’t have an account?{" "}
          <button 
            onClick={() => {router.push("/auth/register")}}
            className="text-[#8bbf9f] cursor-pointer hover:underline">
            Sign up
          </button>
        </p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="absolute top-15 right-20 px-3 py-3 rounded-full bg-[#8bbf9f] border border-[#d6ba73]/30 text-medium text-white shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
      >
        Back to menu
      </button>
    </main>
  );
}