/*
  Warnings:

  - A unique constraint covering the columns `[pays]` on the table `Communaute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Communaute_pays_key` ON `Communaute`(`pays`);
