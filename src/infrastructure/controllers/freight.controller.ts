import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Freight } from '../../domain/entities/freight.entity';
import { FreightService } from '../../domain/services/freight.service';
import { CreateFreightDto } from '../../application/dtos/create-freight.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';


@ApiTags('Freight')
@ApiBearerAuth()
@Controller('freight')
export class FreightController {
  [x: string]: any;
  constructor(private readonly freightService: FreightService) {}

  /**
   * @method POST 
   * @route /Freight
   * @description crear un nuevo registro del lugar
   * @access Privado
   * 
   * @body (string) city = Lugar de la entrega
   * @body (number) price = Precio del flete al lugar
   * 
   * @returns {Promise<Freight[]>}
   */



  @Post ()
  @ApiOperation ({summary:'Crea el nuevo registro'})
  @ApiBody({type:CreateFreightDto})
  @ApiResponse({status: 200, description: 'Creado y retornando el registro'})
  @ApiResponse({status: 500, description: 'Error al crear el registro'})
  async create(@Body () createFreightDto: CreateFreightDto): Promise<Freight> {
    return this.freightService.create(createFreightDto);
  }

  /**
   * @method GET 
   * @route /Freight
   * @description Obtner todos los nuevos registros de lugares
   * @access Privado
   * 
   * @returns {Promise<Freight[]>}
   */

  @Get ()
  @ApiOperation({summary:'Obtiene los registros realizados a la BD'})
  @ApiResponse({status: 200, description: 'Retorta los registros de los Fletes'})
  @ApiResponse({status: 500, description: 'Error en la Bd'})
  async findAll(): Promise<Freight[]> {
    return this.freightService.findAll();
  }

  /**
   * @method GET 
   * @route /Freight /:id
   * @description Actualizar un registro por id
   * @access Privado
   * 
   * @param {number} id - Id del registro a buscar
   * 
   * @returns {Promise<Freigh | null>}
   */

  @Get (':id')
  @ApiOperation({summary:'Obtiene los registros por Id de la BD'})
  @ApiParam({ name: 'id', description: 'Id del registro que se busca', type: Number})
  @ApiResponse({status: 200, description: 'Retorta el producto buscado'})
  @ApiResponse({status: 500, description: 'Error en la Bd'})
  @ApiResponse({status: 404, description: 'No se encontró el registro'})
  async findOne(@Param('id') id: string): Promise<Freight | null> {
    const numericId = parseInt(id, 10); 
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.freightService.findOne(numericId);
  }

  /**
   * @method PUT 
   * @route /Freight /:id
   * @description Obtner un registro por id
   * @access Privado
   * 
   * @param {number} id id del registro a buscar
   * @body {CreateFreightDto} - updateFreightDto = Datos actualizados del registro
   * @returns {Promise<Freigh>}
   */

  @Put(':id')
@ApiOperation({ summary: 'Actualizar un registro por Id' })
@ApiParam({ name: 'id', description: 'Id del producto para actualizar', type: Number })
@ApiBody({ type: CreateFreightDto })
@ApiResponse({ status: 200, description: 'El registro se ha actualizado' })
@ApiResponse({ status: 500, description: 'Error en el servidor' })
@ApiResponse({ status: 404, description: 'Registro no encontrado' })
async update(
  @Param('id') id: string,
  @Body() updateFreightDto: Freight
): Promise<Freight> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid ID format');
  }

  return this.freightService.update(numericId, updateFreightDto);
}
}

/*
@Controller('freights')
export class FreightController {
  constructor(private readonly freightService: FreightService) {}

  @Post()
  async create(@Body() createFreightDto: CreateFreightDto): Promise<Freight> {
    return this.freightService.create(createFreightDto);
  }

  @Get()
  async findAll(): Promise<Freight[]> {
    return this.freightService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Freight | null> {
    return this.freightService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFreightDto: CreateFreightDto): Promise<Freight> {
    return this.freightService.update(id, updateFreightDto);
  
*/
