import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsDate, IsDateString } from 'class-validator';

/**
 * @property {number} productId - ID del producto.
 * @property {Date} date - Fecha de la salida.
 * @property {number} quantity - Cantidad de productos.
 * @property {string} color - Color del producto.
 * @property {string} saleNumber - Número de venta.
 * @property {string} paymentType - Tipo de pago.
 * @property {string} location - Ubicación de entrega.
 * @property {string} driver - Nombre del conductor.
 * @property {string} assistant - Nombre del asistente.
 * @property {string} deliveredBy - Nombre del responsable de la entrega.
 * @property {Date} exitTime - Hora de salida.
 * @property {number} freightID - ID del flete.
 * @property {number} userId - ID del usuario.
 */

export class CreateGoodExitDto {
    
    @ApiProperty({
        description: 'ID del producto',
        type: Number,
      })
    @IsNumber()
    @IsNotEmpty({message: "Dato requerido"})
    productId: number;
    
    @ApiProperty({
        description: 'Fecha de salida',
        type: Date,
      })
    @IsNotEmpty({message: "Dato requerido"})
    @IsDateString({strict: false})
    date: any;
    
    @ApiProperty({
        description: 'Cantidad de productos',
        type: Number,
      })
    @IsNumber()
    @IsNotEmpty({message: "Dato requerido"})
    quantity: number;
    
    @ApiProperty({
        description: 'Color del producto',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    color: string;
    
    @ApiProperty({
        description: 'Numero de venta',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    saleNumber: string;
    
    @ApiProperty({
        description: 'Tipo de pago',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    paymentType: string;
    
    @ApiProperty({
        description: 'Ubicación',
        type: String,
      })
    @IsString({message: "Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    location: string;
    
    @ApiProperty({
        description: 'Conductor',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    driver: string;
    
    @ApiProperty({
        description: 'Asistente',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: " es requerido"})
    assistant: string;
    
    @ApiProperty({
        description: 'Entregado por',
        type: String,
      })
    @IsString({message: " Debe ser tipo texto"})
    @IsNotEmpty({message: "Dato requerido"})
    deliveredBy: string;
    
    
    @ApiProperty({
        description: 'Hora de salida',
        type: Date,
      })
    @IsNotEmpty({message: "Dato requerido"})
    @IsDateString({strict: false})
    exitTime: any;
    
    @ApiProperty({
        description: 'ID del flete',
        type: Number,
      })
    @IsNumber()
    @IsNotEmpty({message: "Dato requerido"})
    freightID: number;

    @ApiProperty({
        description: 'ID de usuario',
        type: Number,
      })
    @IsNumber()
    @IsNotEmpty({message: "Dato requerido"})
    userId: number;
}
