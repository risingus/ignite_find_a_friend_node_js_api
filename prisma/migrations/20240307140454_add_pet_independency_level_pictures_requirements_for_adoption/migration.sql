/*
  Warnings:

  - Added the required column `independency_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independency_level" TEXT NOT NULL,
ADD COLUMN     "pictures" BYTEA,
ADD COLUMN     "requirements_for_adoption" TEXT;
