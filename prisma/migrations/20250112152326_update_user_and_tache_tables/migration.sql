-- AlterTable
ALTER TABLE `user` ADD COLUMN `tache_Id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tache_Id_fkey` FOREIGN KEY (`tache_Id`) REFERENCES `Tache`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
