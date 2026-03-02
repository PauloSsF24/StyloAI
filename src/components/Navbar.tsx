"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";


export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") return null;

  return (
    <header className="sticky top-0 z-50 bg-brand-background border-b border-brand-surface">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold text-brand-accent tracking-tight"
        >
          StyloAI
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-brand-accent/70 hover:text-brand-accent transition"
          >
            Home
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-brand-accent/70 hover:text-brand-accent transition"
              >
                Minhas Roupas
              </Link>

                <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-sm font-semibold text-white"
                >
                    {session.user?.email?.charAt(0).toUpperCase()}
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-brand-surface border border-brand-primary/30 rounded-xl shadow-lg p-2">
                    <p className="px-3 py-2 text-sm text-brand-accent truncate">
                        {session.user?.email}
                    </p>

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full mt-2 px-4 py-2 text-sm bg-brand-primary text-white rounded-lg hover:bg-brand-accent hover:text-brand-background transition"
                    >
                        Sair
                    </button>
                    </div>
                )}
                </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm bg-black text-white rounded-full hover:opacity-90 transition"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="block text-sm">
            Home
          </Link>

          {session ? (
            <>
              <Link href="/dashboard" className="block text-sm">
                Dashboard
              </Link>
              <button
                onClick={() =>
                  signOut({ callbackUrl: "/" })
                }
                className="block text-sm text-left"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="block text-sm">
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}