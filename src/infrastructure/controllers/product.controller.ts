import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
/* */
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { ProductService } from '../../domain/services/product.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')  // Define el grupo de endpoints de Swagger
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /**
  * @method POST
  * @route /products
  * @description Crear un nuevo producto.
  * @access Público
  * 
  * @body {string} name - Nombre del producto.
  * @body {string} brand - Marca del producto.
  * @body {string} model - Modelo del producto.
  * @body {string} description - Descripción del producto.
  * @body {string} category - Categoría del producto.
  * @body {number} stock - Cantidad disponible en stock.
  * @body {number} productCode - Código del producto.
  * @body {Status} status - Estado del producto (usando enum de Prisma).
  * @body {number} branchId - ID de la sucursal a la que pertenece el producto.
  * 
  * @returns {Promise<Product>} El producto creado.
  */
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductDto }) // Describe el cuerpo del POST
  @ApiResponse({ status: 201, description: 'El producto ha sido creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  /**
   * @method GET
   * @route /products
   * @description Obtener todos los productos.
   * @access Público
   * 
   * @returns {Promise<Product[]>} Una lista de todos los productos.
   */
  @Get()
  @ApiOperation({ summary: 'Este endpoint obtiene todos los productos de la BD' })
  @ApiResponse({ status: 200, description: 'Retorna todos los productos' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  findAll(): Promise<Product> {
    return this.productService.findAll();
  }

  /**
   * @method GET
   * @route /products/:id
   * @description Obtener un producto por su ID.
   * @access Público
   * 
   * @param {number} id - ID del producto.
   * @returns {Promise<Product>} El producto encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'El ID del producto a buscar', type: Number }) // Describe el parámetro 'id'
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  /**
   * @method PUT
   * @route /products/:id
   * @description Actualizar un producto por su código.
   * @access Público
   * 
   * @param {number} productCode - Código del producto.
   * @body {CreateProductDto} updateProductDto - Datos actualizados del producto.
   * @returns {Promise<Product>} El producto actualizado.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', description: 'El ID del producto a actualizar', type: Number }) // Describe el parámetro 'id'
  @ApiBody({ type: CreateProductDto }) // Describe el cuerpo del PUT
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  update(
    @Param('id') productCode: number,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.update(productCode, updateProductDto);
  }
}
