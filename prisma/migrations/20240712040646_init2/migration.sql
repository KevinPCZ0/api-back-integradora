/*
  Warnings:

  - You are about to drop the `BranchOffice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TransferProduct" DROP CONSTRAINT "TransferProduct_destinationBranchID_fkey";

-- DropForeignKey
ALTER TABLE "TransferProduct" DROP CONSTRAINT "TransferProduct_originBranchID_fkey";

-- DropTable
DROP TABLE "BranchOffice";

-- CreateTable
CREATE TABLE "Branch" (
    "branchID" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "street" VARCHAR(255) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branchID")
);

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_originBranchID_fkey" FOREIGN KEY ("originBranchID") REFERENCES "Branch"("branchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_destinationBranchID_fkey" FOREIGN KEY ("destinationBranchID") REFERENCES "Branch"("branchID") ON DELETE RESTRICT ON UPDATE CASCADE;
