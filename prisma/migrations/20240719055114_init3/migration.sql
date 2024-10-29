/*
  Warnings:

  - The values [COMPLETED,CANCELED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchID` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Branch` table. All the data in the column will be lost.
  - The primary key for the `Freight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `freightID` on the `Freight` table. All the data in the column will be lost.
  - The primary key for the `GoodsEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entryID` on the `GoodsEntry` table. All the data in the column will be lost.
  - You are about to drop the column `productCode` on the `GoodsEntry` table. All the data in the column will be lost.
  - The primary key for the `GoodsExit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exitID` on the `GoodsExit` table. All the data in the column will be lost.
  - You are about to drop the column `productCode` on the `GoodsExit` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productCode` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `TransferProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `destinationBranchID` on the `TransferProduct` table. All the data in the column will be lost.
  - You are about to drop the column `originBranchID` on the `TransferProduct` table. All the data in the column will be lost.
  - You are about to drop the column `transferID` on the `TransferProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,brand,model,ProductCode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adress` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `GoodsEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GoodsEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `GoodsExit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GoodsExit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ProductCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromBranchId` to the `TransferProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `TransferProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toBranchId` to the `TransferProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TransferProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('ENTREGADO', 'ENTREGADO_MANANA', 'PENDIENTE', 'ENTREGAR_DIA', 'NO_ENTREGADO');
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "GoodsEntry" DROP CONSTRAINT "GoodsEntry_productCode_fkey";

-- DropForeignKey
ALTER TABLE "GoodsExit" DROP CONSTRAINT "GoodsExit_freightID_fkey";

-- DropForeignKey
ALTER TABLE "GoodsExit" DROP CONSTRAINT "GoodsExit_productCode_fkey";

-- DropForeignKey
ALTER TABLE "TransferProduct" DROP CONSTRAINT "TransferProduct_destinationBranchID_fkey";

-- DropForeignKey
ALTER TABLE "TransferProduct" DROP CONSTRAINT "TransferProduct_originBranchID_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_pkey",
DROP COLUMN "branchID",
DROP COLUMN "street",
ADD COLUMN     "adress" VARCHAR(100) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Branch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Freight" DROP CONSTRAINT "Freight_pkey",
DROP COLUMN "freightID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Freight_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsEntry" DROP CONSTRAINT "GoodsEntry_pkey",
DROP COLUMN "entryID",
DROP COLUMN "productCode",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsEntry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsExit" DROP CONSTRAINT "GoodsExit_pkey",
DROP COLUMN "exitID",
DROP COLUMN "productCode",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsExit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "productCode",
ADD COLUMN     "ProductCode" INTEGER NOT NULL,
ADD COLUMN     "branchId" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "model" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TransferProduct" DROP CONSTRAINT "TransferProduct_pkey",
DROP COLUMN "destinationBranchID",
DROP COLUMN "originBranchID",
DROP COLUMN "transferID",
ADD COLUMN     "fromBranchId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "toBranchId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "TransferProduct_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_brand_model_ProductCode_key" ON "Product"("name", "brand", "model", "ProductCode");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsEntry" ADD CONSTRAINT "GoodsEntry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsEntry" ADD CONSTRAINT "GoodsEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExit" ADD CONSTRAINT "GoodsExit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExit" ADD CONSTRAINT "GoodsExit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExit" ADD CONSTRAINT "GoodsExit_freightID_fkey" FOREIGN KEY ("freightID") REFERENCES "Freight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_fromBranchId_fkey" FOREIGN KEY ("fromBranchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_toBranchId_fkey" FOREIGN KEY ("toBranchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
