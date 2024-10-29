import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
/**
 *  Data Transfer Object para la creación de una entrada de producto.
 * @property {string} name - Nombre de la sucursal.
 * @property {string} adress - Direccion dela sucursal.
 */

export class CreateBranchDto {

  @ApiProperty({
    description: 'Nombre de la sucursal',
    type: String,
  })
  @IsString({message: 'El nombre es de tipo texto'})
  @IsNotEmpty({message: 'El nombre es requerido'})
  name: string;


  @ApiProperty({
    description: 'direccion de la sucursal',
    type: String,
  })
  @IsString({message: 'El street es de tipo texto'})
  @IsNotEmpty({message: 'El street es requerido'})
  adress: string;
}
