"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface Weather {
  temperature: number;
  city: string;
  condition: string;
  icon: string;
}

interface Look {
  id: string;
  imageUrl: string;
  nome: string;
}

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 300;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const weatherRes = await fetch("/api/weather");
        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        if (!weatherData?.temperature) {
          setLoading(false);
          return;
        }

        const looksRes = await fetch(
          `/api/looks/recommended?temp=${weatherData.temperature}&occasion=casual&condition=${weatherData.condition}`
        );

        const looksData = await looksRes.json();
        setLooks(looksData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="relative min-h-screen bg-brand-background text-brand-accent antialiased overflow-hidden px-6 py-16">

      {/* Glow Background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-175 h-175 bg-brand-accent/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Seu estilo hoje.
          </h1>

          <p className="mt-4 text-lg text-brand-accent/70 max-w-xl">
            Recomendações inteligentes baseadas no clima atual da sua cidade.
          </p>
        </div>

        {/* WEATHER CARD */}
        {weather && (
          <div className="mb-20 flex justify-center">
            <div className="group bg-brand-accent backdrop-blur-md 
            border border-brand-primary/20
            shadow-2xl shadow-black/30 
            rounded-3xl px-12 py-8 
            flex items-center gap-10
            hover:-translate-y-2 transition-all duration-300">

              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="Weather icon"
                className="w-24 h-24 drop-shadow-lg"
              />

              <div>
                <div className="text-5xl font-bold text-brand-background">
                  {weather.temperature}°C
                </div>

                <div className="text-lg text-brand-background/70">
                  {weather.city}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION TITLE */}
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="text-brand-primary" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            Dicas de Looks
          </h2>
        </div>

        {/* CAROUSEL */}

        <div className="relative mt-8">

          {/* BOTÃO ESQUERDA */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 
            z-20 bg-brand-surface/80 backdrop-blur-md
            border border-brand-primary/20
            p-3 rounded-full shadow-lg
            hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="text-brand-primary" size={22} />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto overflow-y-visible
            snap-x snap-mandatory scroll-smooth
            no-scrollbar py-8 px-14"
          >
            {looks.map((look) => (
              <div
                key={look.id}
                className="group snap-start min-w-70 h-100
                relative rounded-3xl overflow-hidden
                shadow-xl shadow-black/40
                hover:-translate-y-2 hover:scale-[1.02]
                transition-all duration-500"
              >
                {/* IMAGEM */}
                <img
                  src={look.imageUrl}
                  alt={look.nome}
                  className="w-full h-full object-cover
                  group-hover:scale-105 transition-transform duration-700"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t 
                from-black/70 via-black/30 to-transparent" />

                {/* BADGE CLIMA */}
                {weather && (
                  <div className="absolute top-4 left-4 
                  bg-brand-primary text-white text-xs font-semibold
                  px-3 py-1 rounded-full shadow-md">
                    Ideal para {weather.temperature}°C
                  </div>
                )}

                {/* NOME DO LOOK */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-lg font-semibold">
                    {look.nome}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* BOTÃO DIREITA */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 
            z-20 bg-brand-surface/80 backdrop-blur-md
            border border-brand-primary/20
            p-3 rounded-full shadow-lg
            hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="text-brand-primary" size={22} />
          </button>

        </div>

      </div>
    </main>
  );
}