"use client";

import { useEffect, useState } from "react";
import CreateLookModal from "@/components/CreateLookModal";
import Image from "next/image";

type Look = {
  id: string;
  nome: string;
  imageUrl: string;
  clima: string;
  ocasiao: string;
  rating: number;
  createdAt: string;
};

export default function DashboardClient() {
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchLooks();
  }, []);

  async function fetchLooks() {
    try {
      const res = await fetch("/api/looks");
      const data = await res.json();

      setLooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setLooks([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Tem certeza que deseja deletar?");

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/looks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar");
      }

      fetchLooks();
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar look");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Carregando looks...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-700">
            Meus Looks
          </h1>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:opacity-80 transition"
          >
            + Novo Look
          </button>
        </div>

        {isOpen && (
          <CreateLookModal
            onClose={() => setIsOpen(false)}
            onCreated={fetchLooks}
          />
        )}

        {looks.length === 0 ? (
          <p className="text-gray-500">
            Nenhum look cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {looks.map((look) => (
              <div
                key={look.id}
                className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition p-4 text-black"
              >
                <Image
                  src={look.imageUrl}
                  alt={look.nome}
                  width={400}
                  height={500}
                  className="w-full h-64 object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                <h3 className="font-semibold text-lg mt-4">
                  {look.nome}
                </h3>

                <p className="text-sm text-gray-500">
                  Ocasião: {look.ocasiao}
                </p>

                <p className="text-sm text-gray-500">
                  Clima:{" "}
                  {look.clima.charAt(0).toUpperCase() +
                    look.clima.slice(1)}
                </p>

                <button
                  onClick={() => handleDelete(look.id)}
                  className="mt-3 bg-red-600 text-white px-3 py-1 rounded-lg hover:opacity-90 transition"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}