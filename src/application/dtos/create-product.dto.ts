import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object para la creación de un producto.
 * 
 * @property {string} name - Nombre del producto.
 * @property {string} brand - Marca del producto.
 * @property {string} model - Modelo del producto.
 * @property {string} description - Descripción del producto.
 * @property {string} category - Categoría del producto.
 * @property {number} stock - Cantidad disponible en stock.
 * @property {number} productCode - Código del producto.
 * @property {Status} status - Estado del producto (usando enum de Prisma).
 * @property {number} branchId - ID de la sucursal a la que pertenece el producto.
 */

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  name: string;

  @ApiProperty({
    description: 'Marca del producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  brand: string;

  @ApiProperty({
    description: 'Modelo del producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  model: string;

  @ApiProperty({
    description: 'Descripción del producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  description: string;

  @ApiProperty({
    description: 'Categoría del producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  category: string;

  @ApiProperty({
    description: 'Cantidad disponible en stock',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  stock: number;

  @ApiProperty({
    description: 'Código del producto',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  productCode: number;

  @ApiProperty({
    description: 'Estado del producto (usando enum de Prisma)',
    enum: Status,
  })
  status: Status;

  @ApiProperty({
    description: 'ID de la sucursal a la que pertenece el producto',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  branchId: number;
} 
