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
  const [clima, setClima] = useState("mild");
  const [ocasiao, setOcasiao] = useState("Casual");
  const [minTemp, setMinTemp] = useState(18);
  const [maxTemp, setMaxTemp] = useState(26);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      toast.error("Selecione uma imagem 📸");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("clima", clima);
      formData.append("ocasiao", ocasiao);
      formData.append("minTemp", String(minTemp));
      formData.append("maxTemp", String(maxTemp));
      formData.append("image", file);

      const response = await fetch("/api/looks", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao criar look");
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 text-black">
          Criar novo look
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NOME */}
          <input
            placeholder="Nome do look"
            className="w-full border rounded-lg p-2 text-black"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          {/* IMAGEM */}
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImage}
              className="text-black"
            />

            {preview && (
              <img
                src={preview}
                className="mt-3 rounded-lg h-40 w-full object-cover"
              />
            )}
          </div>

          {/* CLIMA */}
          <select
            value={clima}
            onChange={(e) => setClima(e.target.value)}
            className="w-full border rounded-lg p-2 text-black"
          >
            <option value="Ensolarado">Ensolarado</option>
            <option value="Chuva">Chuva</option>
            <option value="Nublado">Nublado</option>
            <option value="Frio">Frio</option>
          </select>

          {/* OCASIÃO */}
          <select
            value={ocasiao}
            onChange={(e) => setOcasiao(e.target.value)}
            className="w-full border rounded-lg p-2 text-black"
          >
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Academia">Academia</option>
            <option value="Festa">Festa</option>
          </select>

          {/* TEMPERATURA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Temp mínima
              </label>
              <input
                type="number"
                value={minTemp}
                onChange={(e) => setMinTemp(Number(e.target.value))}
                className="w-full border rounded-lg p-2 text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Temp máxima
              </label>
              <input
                type="number"
                value={maxTemp}
                onChange={(e) => setMaxTemp(Number(e.target.value))}
                className="w-full border rounded-lg p-2 text-black"
              />
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-black hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}