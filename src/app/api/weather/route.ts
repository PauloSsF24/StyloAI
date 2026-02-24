import { NextResponse } from "next/server";
import { fetchWeather } from "@/services/weather.api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "Cidade é obrigatória" },
      { status: 400 }
    );
  }

  try {
    const weather = await fetchWeather(city);
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar clima" },
      { status: 500 }
    );
  }
}