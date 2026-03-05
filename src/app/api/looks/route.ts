import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { Climate, Occasion } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const looks = await prisma.look.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(looks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar looks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const nome = formData.get("nome") as string;
    const clima = formData.get("clima") as Climate;
    const ocasiao = formData.get("ocasiao") as Occasion;
    const minTemp = Number(formData.get("minTemp"));
    const maxTemp = Number(formData.get("maxTemp"));
    const file = formData.get("image") as File;

    if (!nome || !clima || !ocasiao) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Imagem obrigatória" },
        { status: 400 }
      );
    }

    // 📁 salvar imagem
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // 💾 criar look
    const look = await prisma.look.create({
      data: {
        nome,
        clima,
        ocasiao,
        minTemp,
        maxTemp,
        imageUrl: `/uploads/${fileName}`,
        userId: user.id,
      },
    });

    return NextResponse.json(look, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar look:", error);

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

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const look = await prisma.look.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!look) {
      return NextResponse.json(
        { error: "Look não encontrado ou não pertence a você" },
        { status: 404 }
      );
    }

    // remover imagem
    const filePath = path.join(process.cwd(), "public", look.imageUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

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