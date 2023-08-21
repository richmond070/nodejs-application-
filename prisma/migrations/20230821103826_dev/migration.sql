/*
  Warnings:

  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `user_id` column on the `user_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_infoUser_id` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_user_infoUser_id_fkey";

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "user_infoUser_id",
ADD COLUMN     "user_infoUser_id" INTEGER NOT NULL,
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_infoUser_id_fkey" FOREIGN KEY ("user_infoUser_id") REFERENCES "user_info"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
