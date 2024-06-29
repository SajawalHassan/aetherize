/*
  Warnings:

  - Added the required column `tier` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tiers" AS ENUM ('FREE', 'STARTER', 'PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tier" "Tiers" NOT NULL;
