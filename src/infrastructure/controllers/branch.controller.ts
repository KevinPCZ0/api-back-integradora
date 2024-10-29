import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { BranchService } from '../../domain/services/branch.service';
import { Branch } from '../../domain/entities/branch.entity';
import { CreateBranchDto } from '../../application/dtos/create-branch.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Branch')
@ApiBearerAuth()
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

 /**
   * @method POST
   * @route /branches
   * @description Crear una nueva sucursal.
   * @access Privado
   * 
   * @body {string} name - Nombre de la sucursal.
   * @body {string} adress - Direccion dela sucursal.
   * 
   * @returns {Promise<Branch>} La sucursal fue creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva branch' })
  @ApiBody({ type: CreateBranchDto }) // Describe el cuerpo del POST
  @ApiResponse({ status: 201, description: ' branch ha sido creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

   /**
   * @method GET
   * @route /branches
   * @description Obtener todas las sucursales.
   * @access Privado
   * 
   * @returns {Promise<Branch[]>} Lista de todas las sucursales.
   */

  @Get()
  @ApiOperation({ summary: 'Este endpoint obtiene todas las branch de la BD' })
  @ApiResponse({ status: 200, description: 'Retorna todas las branch' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  async findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

   /**
   * @method GET
   * @route /branches/:id
   * @description Obtener una sucursal por ID.
   * @access Privado
   * 
   * @param {number} id - ID de la sucursal a buscar.
   * 
   * @returns {Promise<Branch | null>} La sucursal fue encontrada o `null` si no existe.
   */

  @Get(':id')
  @ApiOperation({ summary: 'Este endpoint obtiene una branch de la BD por su Id' })
  @ApiParam({ name: 'id', description: 'El ID de la branch a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Retorna la branch a buscar' })
  @ApiResponse({ status: 500, description: 'Ocurrio un error en la BD' })
  @ApiResponse({ status: 404, description: 'No se encontro la branch' })
  async findOne(@Param('id') id: number): Promise<Branch | null> {
    return this.branchService.findOne(id);
  }

  /**
   * @method PUT
   * @route /branches/:id
   * @description Actualizar una sucursal existente.
   * @access Privado
   * 
   * @param {number} id - ID de la sucursal a actualizar.
   * 
   * @body {string} name - Nombre de la sucursal.
   * @body {string} adress - Direccion dela sucursal.
   * 
   * @returns {Promise<Branch>} La sucursal de producto actualizada.
   */

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una branch por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la branch a actualizar', type: Number })
  @ApiBody({ type: CreateBranchDto })
  @ApiResponse({ status: 200, description: 'branch actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'branch no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno en la BD' })
  async update(@Param('id') id: number, @Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.update(id, createBranchDto);
  }

}
