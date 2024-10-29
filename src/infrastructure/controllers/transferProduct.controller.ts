import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { TransferProduct } from '../../domain/entities/transferProduct.entity';
import { TransferProductService } from '../../domain/services/transferProduct.service';
import { CreateTransferProductDto } from '../../application/dtos/create-transferProduct.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transfer-Products')
@ApiBearerAuth()
@Controller('transfer-products')
export class TransferProductController {
  constructor(private readonly transferProductService: TransferProductService) {}

  /**
   * @method GET
   * @route /transfer-products
   * @description Obtener todas las transferencias de producto.
   * @access Privado
   * 
   * @returns {Promise<TransferProduct[]>} Lista de todas las transferencias de producto.
   */
  @Get()
  @ApiOperation({ summary: 'Este endpoint obtiene todas las transferencias de producto de la BD' })
  @ApiResponse({ status: 200, description: 'Retorna todas las transferencias de producto' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  async findAll(): Promise<TransferProduct[]> {
    return this.transferProductService.findAll();
  }

  /**
   * @method GET
   * @route /transfer-products/:id
   * @description Obtener una transferencia de producto por ID.
   * @access Privado
   * 
   * @param {number} id - ID de la transferencia de producto a buscar.
   * 
   * @returns {Promise<TransferProduct | null>} La transferencia de producto encontrada o `null` si no existe.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Este endpoint obtiene un producto de la BD por su Id' })
  @ApiParam({ name: 'id', description: 'El ID de la transferencia de producto a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Retorna el producto a buscar' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  @ApiResponse({ status: 404, description: 'No se encontro la transferencia de producto' })
  async findOne(@Param('id') id: number): Promise<TransferProduct | null> {
    return this.transferProductService.findOne(id);
  }

  /**
   * @method POST
   * @route /transfer-products
   * @description Crear una nueva transferencia de producto.
   * @access Privado
   * 
   * @body {Date} date - Fecha de la transferencia.
   * @body {string} folio - Folio de la transferencia.
   * @body {string} observations - Observaciones de la transferencia.
   * @body {string} driver - Nombre del conductor.
   * @body {string} assistant - Nombre del asistente.
   * @body {string} receivedBy - Nombre de quien recibe el producto.
   * @body {number} productId - ID del producto.
   * @body {number} userId - ID del usuario que registra.
   * @body {number} fromBranchId - ID de la sucursal de origen.
   * @body {number} toBranchId - ID de la sucursal de destino.
   * 
   * @returns {Promise<TransferProduct>} La transferencia de producto creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva transferencia de producto' })
  @ApiBody({ type: CreateTransferProductDto })
  @ApiResponse({ status: 201, description: 'Transferencia de producto creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 500, description: 'Error interno en la BD' })
  async create(@Body() createTransferProductDto: CreateTransferProductDto): Promise<TransferProduct> {
    return this.transferProductService.create(createTransferProductDto);
  }

  /**
   * @method PUT
   * @route /transfer-products/:id
   * @description Actualizar una transferencia de producto existente.
   * @access Privado
   * 
   * @param {number} id - ID de la transferencia de producto a actualizar.
   * 
   * @body {Date} date - Fecha de la transferencia.
   * @body {string} folio - Folio de la transferencia.
   * @body {string} observations - Observaciones de la transferencia.
   * @body {string} driver - Nombre del conductor.
   * @body {string} assistant - Nombre del asistente.
   * @body {string} receivedBy - Nombre de quien recibe el producto.
   * @body {number} productId - ID del producto.
   * @body {number} userId - ID del usuario que registra.
   * @body {number} fromBranchId - ID de la sucursal de origen.
   * @body {number} toBranchId - ID de la sucursal de destino.
   * 
   * @returns {Promise<TransferProduct>} La transferencia de producto actualizada.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una transferencia de producto por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la transferencia de producto a actualizar', type: Number })
  @ApiBody({ type: CreateTransferProductDto })
  @ApiResponse({ status: 200, description: 'Transferencia de producto actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Transferencia de producto no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno en la BD' })
  async update(@Param('id') id: number, @Body() dto: CreateTransferProductDto): Promise<TransferProduct> {
    return this.transferProductService.update(id, dto);
  }
}
