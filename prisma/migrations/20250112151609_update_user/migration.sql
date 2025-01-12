/*
  Warnings:

  - You are about to drop the column `nom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `nom`,
    DROP COLUMN `prenom`;
