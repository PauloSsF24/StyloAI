import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function normalizeWeather(condition: string) {
  if (!condition) return "Ensolarado";

  const c = condition.toLowerCase();

  if (c.includes("rain")) return "Chovendo";
  if (c.includes("cloud")) return "Nublado";
  if (c.includes("snow")) return "Neve";

  return "Ensolarado";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const temp = Number(searchParams.get("temp"));
  const occasion = searchParams.get("occasion") || "casual";
  const condition = normalizeWeather(
    searchParams.get("condition") || "Ensolarado"
  );

  if (!temp) {
    return NextResponse.json(
      { error: "Temperatura inválida" },
      { status: 400 }
    );
  }

  try {
    const looks = await prisma.look.findMany();

    const scored = looks
      .filter((look) => {
        // 🎯 filtro de temperatura
        if (look.minTemp !== null && temp < look.minTemp) return false;
        if (look.maxTemp !== null && temp > look.maxTemp) return false;
        return true;
      })
      .map((look) => {
        let score = 0;

        // 🎯 ocasião (prioridade alta)
        if (look.ocasiao === occasion) {
          score += 40;
        }

        // 🎯 clima
        if (look.clima === condition) {
          score += 30;
        }

        // 🎯 evitar repetir ontem
        if (look.lastUsedAt) {
          const diff =
            Date.now() -
            new Date(look.lastUsedAt).getTime();

          const oneDay = 24 * 60 * 60 * 1000;

          if (diff < oneDay) {
            score -= 50;
          }
        }

        // 🎯 rating (desempate)
        score += look.rating;

        return { ...look, score };
      });

    // ordenar
    scored.sort((a, b) => b.score - a.score);

    // pegar top 5
    const result = scored.slice(0, 5);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar recomendações" },
      { status: 500 }
    );
  }
}