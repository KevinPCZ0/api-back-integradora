-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(150) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "productCode" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "stock" INTEGER NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productCode")
);

-- CreateTable
CREATE TABLE "GoodsEntry" (
    "entryID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "productCode" INTEGER NOT NULL,
    "folio" VARCHAR(100) NOT NULL,
    "observation" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(100) NOT NULL,
    "driver" VARCHAR(100) NOT NULL,
    "assistant" VARCHAR(100) NOT NULL,
    "reciveBy" VARCHAR(100) NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsEntry_pkey" PRIMARY KEY ("entryID")
);

-- CreateTable
CREATE TABLE "GoodsExit" (
    "exitID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "productCode" INTEGER NOT NULL,
    "saleNumber" VARCHAR(100) NOT NULL,
    "paymentType" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "driver" VARCHAR(100) NOT NULL,
    "assistant" VARCHAR(100) NOT NULL,
    "deliveredBy" VARCHAR(100) NOT NULL,
    "exitTime" TIMESTAMP(3) NOT NULL,
    "freightID" INTEGER NOT NULL,

    CONSTRAINT "GoodsExit_pkey" PRIMARY KEY ("exitID")
);

-- CreateTable
CREATE TABLE "TransferProduct" (
    "transferID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "folio" VARCHAR(100) NOT NULL,
    "observations" VARCHAR(255) NOT NULL,
    "driver" VARCHAR(100) NOT NULL,
    "assistant" VARCHAR(100) NOT NULL,
    "receivedBy" VARCHAR(100) NOT NULL,
    "originBranchID" INTEGER NOT NULL,
    "destinationBranchID" INTEGER NOT NULL,

    CONSTRAINT "TransferProduct_pkey" PRIMARY KEY ("transferID")
);

-- CreateTable
CREATE TABLE "Freight" (
    "freightID" SERIAL NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Freight_pkey" PRIMARY KEY ("freightID")
);

-- CreateTable
CREATE TABLE "BranchOffice" (
    "branchID" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "street" VARCHAR(255) NOT NULL,

    CONSTRAINT "BranchOffice_pkey" PRIMARY KEY ("branchID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "GoodsEntry" ADD CONSTRAINT "GoodsEntry_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product"("productCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExit" ADD CONSTRAINT "GoodsExit_freightID_fkey" FOREIGN KEY ("freightID") REFERENCES "Freight"("freightID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExit" ADD CONSTRAINT "GoodsExit_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product"("productCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_originBranchID_fkey" FOREIGN KEY ("originBranchID") REFERENCES "BranchOffice"("branchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferProduct" ADD CONSTRAINT "TransferProduct_destinationBranchID_fkey" FOREIGN KEY ("destinationBranchID") REFERENCES "BranchOffice"("branchID") ON DELETE RESTRICT ON UPDATE CASCADE;
