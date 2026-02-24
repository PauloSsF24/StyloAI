"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateLookModal({ onClose, onCreated }: Props) {
  const [nome, setNome] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [climate, setClima] = useState("");
  const [ocasiao, setOcasiao] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    if (!file) {
      toast.error("Selecione uma imagem 📸");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("clima", climate);
    formData.append("ocasiao", ocasiao);
    formData.append("image", file);

    const response = await fetch("/api/looks", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao criar look");
    }

    toast.success("Look criado com sucesso 👕✨");

    onCreated();
    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Erro ao criar look ❌");
  } finally {
    setLoading(false);
  }
}

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6 text-black">Novo Look</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Nome"
            className="w-full border p-2 rounded-lg text-black"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            className="text-black"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <input
            placeholder="Clima (ex: frio, chuva)"
            className="w-full border p-2 rounded-lg text-black"
            value={climate}
            onChange={(e) => setClima(e.target.value)}
            required
          />

          <input
            placeholder="Ocasião"
            className="w-full border p-2 rounded-lg text-black"
            value={ocasiao}
            onChange={(e) => setOcasiao(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:opacity-90 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}