import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../../domain/services/product.service';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
 
describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  // Mock de ProductService
  const mockProductService = {
    create: jest.fn((dto: CreateProductDto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        id: 1,
        name: 'Product 1',
        brand: 'Brand 1',
        model: 'Model 1',
        description: 'Description 1',
        category: 'Category 1',
        stock: 10,
        productCode: 12345,
        status: 'AVAILABLE',
        branchId: 1,
      },
      {
        id: 2,
        name: 'Product 2',
        brand: 'Brand 2',
        model: 'Model 2',
        description: 'Description 2',
        category: 'Category 2',
        stock: 20,
        productCode: 12346,
        status: 'OUT_OF_STOCK',
        branchId: 2,
      },
    ]),
    findOne: jest.fn((id: number) => ({
      id,
      name: `Product ${id}`,
      brand: `Brand ${id}`,
      model: `Model ${id}`,
      description: `Description ${id}`,
      category: `Category ${id}`,
      stock: 10 * id,
      productCode: 12345 + id,
      status: 'AVAILABLE',
      branchId: id,
    })),
    update: jest.fn((productCode: number, dto: CreateProductDto) => ({
      id: productCode,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'New Product',
      brand: 'New Brand',
      model: 'New Model',
      description: 'New Description',
      category: 'New Category',
      stock: 100,
      productCode: 12347,
      status: 'ENTREGADO', // Enum status
      branchId: 3,
    };

    const result = await controller.create(dto);

    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all products', async () => {
    const result = await controller.findAll();
    
    expect(result).toEqual([
      {
        id: 1,
        name: 'Product 1',
        brand: 'Brand 1',
        model: 'Model 1',
        description: 'Description 1',
        category: 'Category 1',
        stock: 10,
        productCode: 12345,
        status: 'AVAILABLE',
        branchId: 1,
      },
      {
        id: 2,
        name: 'Product 2',
        brand: 'Brand 2',
        model: 'Model 2',
        description: 'Description 2',
        category: 'Category 2',
        stock: 20,
        productCode: 12346,
        status: 'OUT_OF_STOCK',
        branchId: 2,
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a product by id', async () => {
    const id = 1;
    const result = await controller.findOne(id);

    expect(result).toEqual({
      id,
      name: `Product ${id}`,
      brand: `Brand ${id}`,
      model: `Model ${id}`,
      description: `Description ${id}`,
      category: `Category ${id}`,
      stock: 10 * id,
      productCode: 12345 + id,
      status: 'AVAILABLE',
      branchId: id,
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a product', async () => {
    const dto: CreateProductDto = {
      name: 'Updated Product',
      brand: 'Updated Brand',
      model: 'Updated Model',
      description: 'Updated Description',
      category: 'Updated Category',
      stock: 50,
      productCode: 12348,
      status: 'ENTREGADO',
      branchId: 4,
    };

    const productCode = 12348;
    const result = await controller.update(productCode, dto);

    expect(result).toEqual({
      id: productCode,
      ...dto,
    });
    expect(service.update).toHaveBeenCalledWith(productCode, dto);
  });
});
