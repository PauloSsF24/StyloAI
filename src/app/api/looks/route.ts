import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const looks = await prisma.look.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(looks);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar looks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nome, imagemUrl, clima, ocasiao } = body;

    if (!nome || !imagemUrl || !clima || !ocasiao) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const look = await prisma.look.create({
      data: {
        nome,
        imagemUrl,
        clima,
        ocasiao,
      },
    });

    return NextResponse.json(look, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar look" },
      { status: 500 }
    );
  }
}