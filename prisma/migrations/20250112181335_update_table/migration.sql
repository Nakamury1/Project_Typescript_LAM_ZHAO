/*
  Warnings:

  - Made the column `user_Id` on table `tache` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tache` DROP FOREIGN KEY `Tache_user_Id_fkey`;

-- DropIndex
DROP INDEX `Tache_user_Id_fkey` ON `tache`;

-- AlterTable
ALTER TABLE `tache` MODIFY `user_Id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
