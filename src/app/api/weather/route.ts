import { NextResponse } from "next/server";

export async function GET() {
  try {
    const city = "Tres Coracoes";
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();

    return NextResponse.json({
      temperature: Math.round(data.main.temp),
      city: data.name,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar clima" },
      { status: 500 }
    );
  }
}