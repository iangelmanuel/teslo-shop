/*
  Warnings:

  - You are about to drop the `Contries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contries";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
