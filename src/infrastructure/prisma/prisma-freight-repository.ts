import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Freight } from '../../domain/entities/freight.entity';

@Injectable()
export class PrismaFreightRepository {
  constructor(private prisma: PrismaService) {}

  async create(freight: Freight): Promise<Freight> {
    return this.prisma.freight.create({ data: freight });
  }

  async findAll(): Promise<Freight[]> {
    return this.prisma.freight.findMany();
  }

  async findOne(id: string): Promise<Freight | null> {
    const numericId = parseInt(id, 10); // Convierte el string a número
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
  
    return this.prisma.freight.findUnique({
      where: { id: numericId }, // Usa el id convertido
    });
  }

  async update(id: number, freight: Freight): Promise<Freight> {
    if (!id) {
      throw new Error('ID is required');
    }
  
    return this.prisma.freight.update({
      where: {
        id: id, // Asegúrate de que `id` no sea `undefined`
      },
      data: freight, // Puedes usar directamente el objeto `freight` si es el cuerpo de los datos a actualizar
    });
  }

}
