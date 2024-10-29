import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreateGoodExitDto } from '../../application/dtos/create-goodsExit.dto';
import { GoodsExit } from '../../domain/entities/goodsExit.entity';
import { GoodsExitService } from '../../domain/services/goodsExit.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('GoodsExit')
@ApiBearerAuth()
@Controller('goodExits')
export class GoodsExitController {
  constructor(private readonly goodExitService: GoodsExitService) {}

  /**
   * @method POST
   * @route /goodExits
   * @description Crear salida de producto
   * @access Privado
   * 
   * @body {number} productId - ID del producto.
   * @body {Date} date - Fecha de la salida.
   * @body {number} quantity - Cantidad de productos.
   * @body {string} color - Color del producto.
   * @body {string} saleNumber - Número de venta.
   * @body {string} paymentType - Tipo de pago.
   * @body {string} location - Ubicación de entrega.
   * @body {string} driver - Nombre del conductor.
   * @body {string} assistant - Nombre del asistente.
   * @body {string} deliveredBy - Nombre del responsable de la entrega.
   * @body {Date} exitTime - Hora de salida.
   * @body {number} freightID - ID del flete.
   * @body {number} userId - ID del usuario.
   * 
   * @returns {Promise<GoodsExit>}
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva salida de productos' })
  @ApiBody({ type: CreateGoodExitDto})
  @ApiResponse({ status: 201, description: 'Salida de productos creada correctamente', type: GoodsExit })
  @ApiResponse({ status: 400, description: 'Datos incorrectos' })
  async create(@Body() createGoodExitDto: CreateGoodExitDto): Promise<GoodsExit> {
    
    return this.goodExitService.create(createGoodExitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las salidas de productos' })
  @ApiResponse({ status: 200, description: 'Lista de salidas de productos', type: [GoodsExit] })
  async findAll(): Promise<GoodsExit[]> {
    return this.goodExitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una salida de productos por ID' })
  @ApiParam({ name: 'id', description: 'ID de la salida de productos' })
  @ApiResponse({ status: 200, description: 'Salida de productos encontrada', type: GoodsExit })
  @ApiResponse({ status: 404, description: 'Salida de productos no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GoodsExit| null> {
    return this.goodExitService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una salida de productos por ID' })
  @ApiParam({ name: 'id', description: 'ID de la salida de productos' })
  @ApiResponse({ status: 200, description: 'Salida de productos actualizada correctamente', type: GoodsExit })
  @ApiResponse({ status: 404, description: 'Salida de productos no encontrada' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateGoodExitDto: CreateGoodExitDto): Promise<GoodsExit> {

    return this.goodExitService.update(id, updateGoodExitDto);
  }
}
