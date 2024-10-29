import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateFreightDto {
  @ApiProperty ({
    description: 'Lugar de la entrega',
    type: String,
  })
  @IsString({message: "La ciudad es tipo texto"})
  @IsNotEmpty({message: "La cuidad es requerida"})
  city: string;

  @ApiProperty ({
    description: 'Precio del flete al lugar',
    type: Number,
  })
  @Min(1)
  @IsNumber ()
  @IsNotEmpty({message: "El precio es requerido"})
  price: number;
}
