import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GoodsExit } from '../../domain/entities/goodsExit.entity';



@Injectable()
export class PrismaGoodsExitRepository{
    constructor(private readonly prisma: PrismaService) {}
    async create(exit: GoodsExit): Promise<GoodsExit | OnBeforeUnloadEventHandlerNonNull> {
      const productExists = await this.prisma.product.findUnique({ where: { id: exit.productId } });
      const userExists = await this.prisma.user.findUnique({ where: { id: exit.userId } });
      const freightExists = await this.prisma.freight.findUnique({ where: { id: exit.freightID } });

      if (!productExists) {
        throw new Error(`Product with ID ${exit.productId} does not exist.`);
      }

      if (!userExists) {
        throw new Error(`User with ID ${exit.userId} does not exist.`);
      }

      if (!freightExists) {
        throw new Error(`Freight with ID ${exit.freightID} does not exist.`);
      }
    const newExit = await this.prisma.goodsExit.create({
      data: {
        date: exit.date,
        quantity: exit.quantity,
        color: exit.color,
        saleNumber: exit.saleNumber,
        paymentType: exit.paymentType,
        location: exit.location,
        driver: exit.driver,
        assistant: exit.assistant,
        deliveredBy: exit.deliveredBy,
        exitTime: exit.exitTime,
        userId: exit.userId,
        freightID: exit.freightID,
        productId: exit.productId,
      },
    });

    return new GoodsExit(
      newExit.date,
      newExit.quantity,
      newExit.color,
      newExit.saleNumber,
      newExit.paymentType,
      newExit.location,
      newExit.driver,
      newExit.assistant,
      newExit.deliveredBy,
      newExit.exitTime,
      newExit.productId,
      newExit.userId,
      newExit.freightID,
    );
  }
  
    async findAll(): Promise<GoodsExit[]> {
      return this.prisma.goodsExit.findMany();
    }
  
    async findOne(id: number): Promise<GoodsExit | null> {
      return this.prisma.goodsExit.findUnique({ where: { id } });
    }
  
    async update(id: number, goodExit: GoodsExit): Promise<GoodsExit> {
      return this.prisma.goodsExit.update({ where: { id }, data: goodExit });
    }
  
    async delete(id: number): Promise<void> {
      await this.prisma.goodsExit.delete({ where: { id } });
    }
}
