"use client";

import { useWeather } from "@/hooks/useWeather";

export default function Home() {
  const { data, loading, error } = useWeather("Tres Coracoes");

  if (loading) return <p>Carregando clima...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Closet Inteligente</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 20,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <h2>Clima Atual</h2>
        <p>Temperatura: {data?.temperature}°C</p>
        <p>Sensação: {data?.feelsLike}°C</p>
        <p>Descrição: {data?.description}</p>
        <p>Classificação: {data?.climateType}</p>
      </div>
    </div>
  );
}