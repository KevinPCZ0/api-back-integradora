import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

/**
 * @property {string} name - nombre del usuario
 * @property {string} email - correo electronico del usuario
 * @property {string} password - contraseña del usuario
 */

export class RegisterDto {

	@ApiProperty({
		description: 'Nombre del usuario',
		type: String
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Correo electronico del usuario',
		type: String
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Contraseña del usuario',
		type: String
	})
	@IsString()
	@MinLength(6)
	password: string;
}