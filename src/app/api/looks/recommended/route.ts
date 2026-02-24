import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getClimate(temp: number) {
  if (temp <= 18) return "cold";
  if (temp <= 26) return "mild";
  return "hot";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const temp = Number(searchParams.get("temp"));
  const occasion = searchParams.get("occasion") || "casual";

  const climate = getClimate(temp);

  const looks = await prisma.look.findMany();

  const scored = looks.map((look) => {
    let score = 0;

    // 🎯 Clima (peso alto)
    if (look.climate === climate) score += 40;

    // 🎯 Ocasião
    if (look.occasion === occasion) score += 30;

    // 🎯 Não usado recentemente (7 dias)
    if (
      !look.lastUsedAt ||
      Date.now() - new Date(look.lastUsedAt).getTime() >
        7 * 24 * 60 * 60 * 1000
    ) {
      score += 20;
    }

    // 🎯 Avaliação
    score += look.rating * 2;

    return { ...look, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return NextResponse.json(scored.slice(0, 5));
}