-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('BASIC', 'ADMIN');

-- CreateTable
CREATE TABLE "user_info" (
    "user_id" TEXT NOT NULL,
    "full_name" VARCHAR(250) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'BASIC',
    "address" VARCHAR(300) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "password" VARCHAR(150) NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "plan" VARCHAR(15) NOT NULL,
    "paymentMethod" VARCHAR(15) NOT NULL,
    "amount" INTEGER NOT NULL,
    "user_infoUser_id" TEXT NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_info_email_key" ON "user_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_name_email_key" ON "user_info"("user_name", "email");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_infoUser_id_fkey" FOREIGN KEY ("user_infoUser_id") REFERENCES "user_info"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
