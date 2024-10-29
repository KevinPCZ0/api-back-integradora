/*
  Warnings:

  - You are about to drop the column `ProductCode` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,brand,model,productCode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_name_brand_model_ProductCode_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ProductCode",
ADD COLUMN     "productCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_brand_model_productCode_key" ON "Product"("name", "brand", "model", "productCode");
