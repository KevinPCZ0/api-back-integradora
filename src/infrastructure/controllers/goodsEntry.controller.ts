import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { GoodsEntryService } from '../../domain/services/goodsEntry.service';
import { CreateGoodsEntryDto } from '../../application/dtos/create-goodsEntry.dto';
import { GoodsEntry } from '../../domain/entities/goodsEntry.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Entry')
@ApiBearerAuth()
@Controller('goods-entries')
export class GoodsEntryController {
  constructor(private readonly goodsEntryService: GoodsEntryService) {}

   /**
   * @method POST
   * @route /goods-entries
   * @description Crear una nueva entrada de producto.
   * @access Privado
   * 
   * @body {Date} date - Fecha de la entrada.
   * @body {number} quantity - cantidad de producto.
   * @body {string} color - color del producto.
   * @body {string} folio - folio de la entrada.
   * @body {string} observation - observacion de la entrada.
   * @body {string} origin - origen de la entrada de producto.
   * @body {string} driver - nombre del conductor.
   * @body {string} assistant - nombre del asistente.
   * @body {string} reciveBy - nombre de quien recibe.
   * @body {Date} entryTime - fecha y hora de entrada.
   * @body {number} productId - Id del producto.
   * @body {number} userId - Id del usuario.
   * 
   * @returns {Promise<GoodsEntry>} entrada de producto fue creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva entrada de productos' })
  @ApiBody({ type: CreateGoodsEntryDto }) // Describe el cuerpo del POST
  @ApiResponse({ status: 201, description: 'La nueva entrada de productos ha sido creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  async create(@Body() createGoodsEntryDto: CreateGoodsEntryDto): Promise<GoodsEntry> {
    return this.goodsEntryService.create(createGoodsEntryDto);
  }

  /**
   * @method GET
   * @route /goods-entries
   * @description Obtener todas las entradas de producto.
   * @access Privado
   * 
   * @returns {Promise<GoodsEntry[]>} Lista de todas las entradas de producto.
   */

  @Get()
  @ApiOperation({ summary: 'Este endpoint obtiene todas las entradas de productos de la BD' })
  @ApiResponse({ status: 200, description: 'Retorna todas las  entradas de productos' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  async findAll(): Promise<GoodsEntry[]> {
    return this.goodsEntryService.findAll();
  }

  /**
    * @method GET
   * @route /goods-entries/:id
   * @description Obtener  entradas de producto por id.
   * @access Privado
   * 
   * @param {number} id - ID de la entrada de producto a buscar.
   * 
   * @returns {Promise<GoodsEntry | null>} La entrada de producto encontrada o `null` si no existe.
   */

  @Get(':id')
  @ApiOperation({ summary: 'Este endpoint obtiene una entrada de producto de la BD por su Id' })
  @ApiParam({ name: 'id', description: 'El ID de la entrada de producto a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Retorna la entrada de producto a buscar' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  @ApiResponse({ status: 404, description: 'No se encontro la entrada de producto' })
  async findOne(@Param('id') id: number): Promise<GoodsEntry | null> {
    return this.goodsEntryService.findOne(id);
  }

  /**
   * @method PUT
   * @route /goods-entries/:id
   * @description Actualizar una entrada de producto existente.
   * @access Privado
   * 
   * @param {number} id - ID de la entrada de producto a actualizar.
   * 
   * @body {Date} date - Fecha de la entrada.
   * @body {number} quantity - cantidad de producto.
   * @body {string} color - color del producto.
   * @body {string} folio - folio de la entrada.
   * @body {string} observation - observacion de la entrada.
   * @body {string} origin - origen de la entrada de producto.
   * @body {string} driver - nombre del conductor.
   * @body {string} assistant - nombre del asistente.
   * @body {string} reciveBy - nombre de quien recibe.
   * @body {Date} entryTime - fecha y hora de entrada.
   * @body {number} productId - Id del producto.
   * @body {number} userId - Id del usuario.
   * 
   * @returns {Promise<GoodsEntry>} La entrada de producto actualizada.
   */

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una entrada de productos por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la entrada de productos a actualizar', type: Number })
  @ApiBody({ type: CreateGoodsEntryDto })
  @ApiResponse({ status: 200, description: 'entrada de productos actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'entrada de productos no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno en la BD' })
  async update(@Param('id') id: number, @Body() updateGoodsEntryDto: CreateGoodsEntryDto): Promise<GoodsEntry> {
  
    return this.goodsEntryService.update(id, updateGoodsEntryDto);
  }
}
