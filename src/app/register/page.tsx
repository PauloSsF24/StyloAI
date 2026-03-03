"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-brand-accent p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-brand-background">Cadastro</h1>

        <input
          placeholder="Nome"
          className="w-full border p-2 rounded-lg text-brand-background"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-lg text-brand-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded-lg text-brand-background"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-brand-primary text-brand-background font-bold py-2 rounded-lg"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}