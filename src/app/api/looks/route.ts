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
    const formData = await req.formData();

    const nome = formData.get("nome") as string;
    const clima = formData.get("clima") as string;
    const ocasiao = formData.get("ocasiao") as string;
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Imagem obrigatória" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const path = `./public/uploads/${fileName}`;

    const fs = require("fs");
    const uploadDir = "./public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path, buffer);

    const look = await prisma.look.create({
      data: {
        nome,
        clima,
        ocasiao,
        imageUrl: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json(look, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar look" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const look = await prisma.look.findUnique({
      where: { id },
    });

    if (!look) {
      return NextResponse.json(
        { error: "Look não encontrado" },
        { status: 404 }
      );
    }

    // 🔥 Remove arquivo físico
    const fs = require("fs");
    const path = `./public${look.imageUrl}`;

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // 🔥 Remove do banco
    await prisma.look.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Look deletado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao deletar look" },
      { status: 500 }
    );
  }
}