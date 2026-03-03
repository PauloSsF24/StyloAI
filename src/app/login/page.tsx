"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha inválidos");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-brand-accent p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-brand-background">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

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
          Entrar
        </button>
        <div className="flex gap-4">
          <button
            type="submit"
            onClick={() => router.push("/register")}
            className="w-full bg-brand-primary text-brand-background font-bold py-1 rounded-lg"
          >
            Criar Conta
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full border py-1 rounded-lg text-shadow-brand-accent font-bold bg-brand-surface"
          >
            Entrar com Google
          </button>
        </div>
      </form>
    </div>
  );
}