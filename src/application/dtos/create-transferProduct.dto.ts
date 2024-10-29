import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object para la creación de una transferencia de producto.
 * 
 * @property {Date} date - Fecha en la que salió el producto.
 * @property {string} folio - Folio del producto.
 * @property {string} observations - Observaciones del producto.
 * @property {string} driver - Nombre del conductor.
 * @property {string} assistant - Nombre del asistente del conductor.
 * @property {string} receivedBy - Nombre de quien recibe el producto.
 * @property {number} productId - ID del producto.
 * @property {number} userId - ID del usuario que registró la transferencia.
 * @property {number} fromBranchId - ID de la sucursal de origen.
 * @property {number} toBranchId - ID de la sucursal a la que se dirige el producto.
 */

export class CreateTransferProductDto {

  @ApiProperty({
    description: 'Fecha en la que salio el product',
    type: Date,
  })
  @IsNotEmpty({ message: "Dato requerido" })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date: Date;

  @ApiProperty({
    description: 'Folio del producto',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: "Dato requerido" })
  folio: string;

  @ApiProperty({
    description: 'Alguna Observación del producto ',
    type: String,
  })
  @IsString({ message: " Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  observations: string;

  @ApiProperty({
    description: 'Nombre del conductor',
    type: String,
  })
  @IsString({ message: " Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  driver: string;

  @ApiProperty({
    description: 'Nombre del asistente del coductor',
    type: String,
  })
  @IsString({ message: " Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  assistant: string;

  @ApiProperty({
    description: 'Nombre de quien recibe el producto',
    type: String,
  })
  @IsString({ message: "Debe ser tipo texto" })
  @IsNotEmpty({ message: "Dato requerido" })
  receivedBy: string;

  @ApiProperty({
    description: 'Id del producto',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  productId: number;

  @ApiProperty({
    description: 'Id del usuario quien lo registro',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  userId: number;

  @ApiProperty({
    description: 'Nombre de la sucursal de origen',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  fromBranchId: number;

  @ApiProperty({
    description: 'Nombre de la sucursal a la cual se dirigue',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: "Dato requerido" })
  toBranchId: number;
}
