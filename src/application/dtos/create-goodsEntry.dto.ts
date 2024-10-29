import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';


/**
 * Data Transfer Object para la creación de una entrada de producto.
 * 
  * @property {Date} date - Fecha de la entrada.
   * @property {number} quantity - cantidad de producto.
   * @property {string} color - color del producto.
   * @property {string} folio - folio de la entrada.
   * @property {string} observation - observacion de la entrada.
   * @property {string} origin - origen de la entrada de producto.
   * @property {string} driver - nombre del conductor.
   * @property {string} assistant - nombre del asistente.
   * @property {string} reciveBy - nombre de quien recibe.
   * @property {Date} entryTime - fecha y hora de entrada.
   * @property {number} productId - Id del producto.
   * @property {number} userId - Id del usuario.
   * 
 */
export class CreateGoodsEntryDto {

    @ApiProperty({
        description: 'La fecha de la entrada de productos',
        type: Date,
      })
    @IsNotEmpty({message: "La fecha es requerido"})
    date: Date;

   
    @ApiProperty({
        description: 'cantidad de productos',
        type: Number,
      })
    @IsNotEmpty({message: "La cantidad es requerida"})
    @IsNumber()
    quantity : number;
    

    @ApiProperty({
        description: 'color del productos',
        type: String,
      })
    @IsString({message: "El color es de tipo texto"})
    @IsNotEmpty({message: "El color es requerido"})
    color: string;
    
    

    @ApiProperty({
        description: 'folio del producto',
        type: String,
      })
    @IsString({message: "El folio es de tipo texto"})
    @IsNotEmpty({message: "El folio es requerido"})
    folio: string;
    

    @ApiProperty({
        description: 'observación del producto',
        type: String,
      })
    @IsString({message: "La observacion es de tipo texto "})
    @IsNotEmpty({message: "La observacion es requerida"})
    observation: string;
    

    @ApiProperty({
        description: 'origen del producto',
        type: String,
      })
    @IsString({message: "El origen es de tipo texto"})
    @IsNotEmpty({message: "El origen es requerido"})
    origin: string;
    

    @ApiProperty({
        description: 'nombre del conductor',
        type: String,
      })
    @IsString({message: "Driver es de tipo texto"})
    @IsNotEmpty({message: "driver es requerido"})
    driver: string;
    

    @ApiProperty({
        description: 'nombre del asistente',
        type: String,
      })
    @IsString({message: "assistant es tipo texto"})
    @IsNotEmpty({message: "assistant es requerida"})
    assistant: string;
    

    @ApiProperty({
        description: 'nombre de quien recibe',
        type: String,
      })
    @IsString({message: " reciveBy es de tipo texto"})
    @IsNotEmpty({message:  "reciveBy es requerido"})
    reciveBy: string;
    

    @ApiProperty({
        description: 'fecha y hora de entrada',
        type: Date,
      })
    @IsNotEmpty({message: "entryTime es requerido"})
    entryTime: Date;


    @ApiProperty({
        description: 'codigo del producto',
        type: Number,
      })
    @IsNotEmpty({message: "El codigo del producto es requerido"})
    @IsNumber()
    productId: number;


    @ApiProperty({
        description: 'El codigo del usuario',
        type: Number,
      })
    @IsNotEmpty({message: "El codigo del usuario es requerido"})
    @IsNumber()
    userId: number;
}
