import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { GoodsEntry } from "../../domain/entities/goodsEntry.entity";

@Injectable()
export class PrismaGoodsEntryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create( entry: GoodsEntry): Promise<GoodsEntry | null> {
    const product = await this.prisma.product.findUnique({
      where: { id:  entry.productId },
    })
    if(!product) {
      throw new BadRequestException('No se encontró el producto')
    }

    const newEntry = await this.prisma.goodsEntry.create({
      data: {
        date: entry.date,
        quantity: entry.quantity,
        color: entry.color,        
        folio: entry.folio,
        observation: entry.observation,
        origin: entry.origin,
        driver: entry.driver,
        assistant: entry.assistant,
        reciveBy: entry.reciveBy,
        entryTime: entry.entryTime,
        productId: entry.productId,
        userId: entry.userId
      },
    });
    return new GoodsEntry(
      newEntry.date,
      newEntry.quantity,
      newEntry.color, 
      newEntry.folio,
      newEntry.observation,
      newEntry.origin,
      newEntry.driver,
      newEntry.assistant,
      newEntry.reciveBy,
      newEntry.entryTime,
      newEntry.id,
      newEntry.userId
    );
  }

  async findAll(): Promise<GoodsEntry[] | null> {
    return this.prisma.goodsEntry.findMany();
  }

  async findOne(id: string): Promise<GoodsEntry | null> {
    const numericId = parseInt(id, 10); // Convert the string to an integer
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format'); // Handle invalid conversion
    }
    return this.prisma.goodsEntry.findUnique({ where: { id: numericId } });
  }


  async update(id: string, goodsEntry:GoodsEntry): Promise<GoodsEntry > {
    const numericId = parseInt(id, 10);
    const newgoodsEntry = await this.prisma.goodsEntry.update({
      where: { id: numericId },
      data:goodsEntry,
    });

    return new GoodsEntry(
      newgoodsEntry.date,
      newgoodsEntry.quantity,
      newgoodsEntry.color,
      newgoodsEntry.folio,
      newgoodsEntry.observation,
      newgoodsEntry.origin,
      newgoodsEntry.driver,
      newgoodsEntry.assistant,
      newgoodsEntry.reciveBy,
      newgoodsEntry.entryTime,
      newgoodsEntry.productId,
      newgoodsEntry.userId
    )
  }


}
