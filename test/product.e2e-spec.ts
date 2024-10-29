import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { CreateProductDto } from 'src/application/dtos/create-product.dto';


describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get(PrismaService);

    // Limpiar la base de datos antes de ejecutar las pruebas
    await prismaService.product.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST) should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      brand: 'Test Brand',
      model: 'Test Model',
      description: 'Test Description',
      category: 'Test Category',
      stock: 10,
      productCode: 12345,
      status: 'ENTREGADO',
      branchId: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      ...createProductDto,
    });

    const createdProduct = await prismaService.product.findUnique({
      where: { id: response.body.id },
    });

    expect(createdProduct).toBeDefined();
  });

  it('/products (GET) should return an array of products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/products/:id (GET) should return a product by id', async () => {
    const product = await prismaService.product.create({
      data: {
        name: 'Another Product',
        brand: 'Another Brand',
        model: 'Another Model',
        description: 'Another Description',
        category: 'Another Category',
        stock: 20,
        productCode: 12346,
        status: 'ENTREGADO',
        branchId: 2,
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/products/${product.id}`)
      .expect(200);

    expect(response.body).toEqual({
      id: product.id,
      name: 'Another Product',
      brand: 'Another Brand',
      model: 'Another Model',
      description: 'Another Description',
      category: 'Another Category',
      stock: 20,
      productCode: 12346,
      status: 'ENTREGADO',
      branchId: 2,
    });
  });

  it('/products/:id (PUT) should update a product', async () => {
    const product = await prismaService.product.create({
      data: {
        name: 'Old Product',
        brand: 'Old Brand',
        model: 'Old Model',
        description: 'Old Description',
        category: 'Old Category',
        stock: 5,
        productCode: 12347,
        status: 'ENTREGADO',
        branchId: 3,
      },
    });

    const updateProductDto: CreateProductDto = {
      name: 'Updated Product',
      brand: 'Updated Brand',
      model: 'Updated Model',
      description: 'Updated Description',
      category: 'Updated Category',
      stock: 15,
      productCode: 12348,
      status: 'ENTREGADO',
      branchId: 4,
    };

    const response = await request(app.getHttpServer())
      .put(`/products/${product.id}`)
      .send(updateProductDto)
      .expect(200);

    expect(response.body).toEqual({
      id: product.id,
      ...updateProductDto,
    });

    const updatedProduct = await prismaService.product.findUnique({
      where: { id: product.id },
    });

    expect(updatedProduct).toEqual({
      id: product.id,
      ...updateProductDto,
    });
  });
});
