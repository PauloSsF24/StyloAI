-- CreateTable
CREATE TABLE "Look" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "clima" TEXT NOT NULL,
    "ocasiao" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Look_pkey" PRIMARY KEY ("id")
);
