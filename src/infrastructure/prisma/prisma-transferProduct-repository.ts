import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TransferProduct } from '../../domain/entities/transferProduct.entity';
import { CreateTransferProductDto } from 'src/application/dtos/create-transferProduct.dto';

@Injectable()
export class PrismaTransferProductRepository {
  constructor(private prisma: PrismaService) { }
  async create(transferProduct: TransferProduct): Promise<TransferProduct> {
    // Verificar si el producto existe
    const product = await this.prisma.product.findUnique({
      where: { id: transferProduct.productId },
    });
    if (!product) {
      throw new BadRequestException(`Product with ID ${transferProduct.productId} does not exist.`);
    }

    // Verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: transferProduct.userId },
    });
    if (!user) {
      throw new BadRequestException(`User with ID ${transferProduct.userId} does not exist.`);
    }

    // Verificar si las sucursales existen
    const fromBranch = await this.prisma.branch.findUnique({
      where: { id: transferProduct.fromBranchId },
    });
    const toBranch = await this.prisma.branch.findUnique({
      where: { id: transferProduct.toBranchId },
    });
    if (!fromBranch) {
      throw new BadRequestException(`From branch with ID ${transferProduct.fromBranchId} does not exist.`);
    }
    if (!toBranch) {
      throw new BadRequestException(`To branch with ID ${transferProduct.toBranchId} does not exist.`);
    }

    // Crear el nuevo registro
    const newTransfer = await this.prisma.transferProduct.create({
      data: {
        date: transferProduct.date,
        folio: transferProduct.folio,
        observations: transferProduct.observations,
        driver: transferProduct.driver,
        assistant: transferProduct.assistant,
        receivedBy: transferProduct.receivedBy,
        productId: transferProduct.productId,
        userId: transferProduct.userId,
        fromBranchId: transferProduct.fromBranchId,
        toBranchId: transferProduct.toBranchId,
      },
    });

    // Retornar una nueva instancia de TransferProduct con los datos creados
    return new TransferProduct(
      newTransfer.date,
      newTransfer.folio,
      newTransfer.observations,
      newTransfer.driver,
      newTransfer.assistant,
      newTransfer.receivedBy,
      newTransfer.productId,
      newTransfer.userId,
      newTransfer.fromBranchId,
      newTransfer.toBranchId,
    );
  }

  async findAll(): Promise<TransferProduct[]> {
    return this.prisma.transferProduct.findMany();
  }

  async findOne(id: string): Promise<TransferProduct | null> {
    const numericId = parseInt(id, 10); // Convert the string to an integer
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format'); // Handle invalid conversion
    }
    return this.prisma.transferProduct.findUnique({ where: { id: numericId } });
  }

  async update(id: string, transferProduct: TransferProduct): Promise<TransferProduct> {
    const parsedId = parseInt(id, 10);
    // Check if the TransferProduct exists
    const existingTransfer = await this.prisma.transferProduct.findUnique({
      where: { id: parsedId },
    });

    if (!existingTransfer) {
      throw new Error(`TransferProduct with ID ${parsedId} not found.`);
    }

    // Check if related records exist
    const productExists = await this.prisma.product.findUnique({
      where: { id: transferProduct.productId },
    });
    if (!productExists) {
      throw new Error(`Product with ID ${transferProduct.productId} not found.`);
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: transferProduct.userId },
    });
    if (!userExists) {
      throw new Error(`User with ID ${transferProduct.userId} not found.`);
    }

    const fromBranchExists = await this.prisma.branch.findUnique({
      where: { id: transferProduct.fromBranchId },
    });
    if (!fromBranchExists) {
      throw new Error(`Branch with ID ${transferProduct.fromBranchId} not found.`);
    }

    const toBranchExists = await this.prisma.branch.findUnique({
      where: { id: transferProduct.toBranchId },
    });
    if (!toBranchExists) {
      throw new Error(`Branch with ID ${transferProduct.toBranchId} not found.`);
    }

    // Proceed with the update if all checks pass
    const updatedTransfer = await this.prisma.transferProduct.update({
      where: { id: parsedId },
      data: transferProduct,
    });
    return new TransferProduct(
      updatedTransfer.date,
      updatedTransfer.folio,
      updatedTransfer.observations,
      updatedTransfer.driver,
      updatedTransfer.assistant,
      updatedTransfer.receivedBy,
      updatedTransfer.productId,
      updatedTransfer.userId,
      updatedTransfer.fromBranchId,
      updatedTransfer.toBranchId,
    );
  }

  private isValidCreateTransferProduct(transferProduct: CreateTransferProductDto): boolean {
    return Boolean(transferProduct.date && transferProduct.folio && transferProduct.driver && transferProduct.assistant && transferProduct.receivedBy && transferProduct.fromBranchId && transferProduct.toBranchId)
  }

  private isValidUpdateTransferProduct(transferProduct: CreateTransferProductDto): boolean {
    return Boolean(transferProduct.date || transferProduct.folio || transferProduct.driver || transferProduct.assistant || transferProduct.receivedBy || transferProduct.fromBranchId || transferProduct.toBranchId)
  }
}