/*
  Warnings:

  - You are about to drop the column `tache_Id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_tache_Id_fkey`;

-- DropIndex
DROP INDEX `User_tache_Id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `tache` ADD COLUMN `user_Id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `tache_Id`;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
