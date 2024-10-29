import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { User } from '../../domain/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../../application/dtos/register-dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @method GET
   * @route /users/:id
   * @param {number} id
   * @description Obtener usuario por id
   * @access Privado
   * @returns {Promise<User | null>}
   */

  @Get(':id')
  @ApiOperation({summary: 'Este endpoint obtiene un usuario de la bd por su id'})
  @ApiParam({ name: 'id', description: 'ID del usuario a buscar'})
  @ApiResponse({status: 200, description: 'Retorna el usuario por su id'})
  @ApiResponse({status: 500, description: 'Error al obtener usuario por id'})
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  /**
   * @method POST
   * @route /users
   * @description Crear usuario
   * @access Privado
   * 
   * @body {string} name - nombre del usuario
   * @body {string} email - correo electronico del usuario
   * @body {string} password - contraseña del usuario
   * 
   * @returns {Promise<User>}
   */
  @Post()
  @ApiOperation({summary: 'Este endpoint crea un usuario en la db'})
  @ApiBody({ type: RegisterDto})
  @ApiResponse({status: 201, description: 'Crea y retorna el usuario'})
  @ApiResponse({status: 500, description: 'Error al crear usuario'})
  async createUser(@Body() createUserDto: { name: string, email: string, password: string }): Promise<User> {
    const { name, email, password } = createUserDto;
    return this.userService.createUser(name, email, password);
  }
}
