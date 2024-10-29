import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
	
	@IsNotEmpty()
	@IsEmail()
	username: string;
	

	@MinLength(6)
	@IsNotEmpty()
	password: string;

}