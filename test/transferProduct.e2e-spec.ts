import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTransferProductDto } from '../src/application/dtos/create-transferProduct.dto';
import { TransferProductService } from '../src/domain/services/transferProduct.service';

describe('TransferProductController (e2e)', () => {
  let app: INestApplication;
  let transferProductService = {
    create: jest.fn((dto: CreateTransferProductDto) => ({
      id: Date.now(),
      ...dto,
      date: dto.date.toISOString(),
    })),
    findAll: jest.fn(() => [
      {
        id: 1,
        date: new Date().toISOString(),
        folio: 'F123',
        observations: 'Observation 1',
        driver: 'Driver 1',
        assistant: 'Assistant 1',
        receivedBy: 'Receiver 1',
        productId: 1,
        userId: 1,
        fromBranchId: 1,
        toBranchId: 2,
      },
      {
        id: 2,
        date: new Date().toISOString(),
        folio: 'F124',
        observations: 'Observation 2',
        driver: 'Driver 2',
        assistant: 'Assistant 2',
        receivedBy: 'Receiver 2',
        productId: 2,
        userId: 2,
        fromBranchId: 1,
        toBranchId: 2,
      },
    ]),
    findOne: jest.fn((id: number) => ({
      id: Number(id),
      date: new Date().toISOString(),
      folio: `${id}`,
      observations: `Observation ${id}`,
      driver: `Driver ${id}`,
      assistant: `Assistant ${id}`,
      receivedBy: `Receiver ${id}`,
      productId: Number(id),
      userId: Number(id),
      fromBranchId: 1,
      toBranchId: 2,
    })),
    update: jest.fn((id: number, dto: CreateTransferProductDto) => ({
      id: Number(id),
      ...dto,
      date: dto.date.toISOString(),
    })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TransferProductService)
      .useValue(transferProductService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST transfer-products', async () => {
    const dto: CreateTransferProductDto = {
      date: new Date(), 
      folio: 'F125',
      observations: 'New Observation',
      driver: 'New Driver',
      assistant: 'New Assistant',
      receivedBy: 'New Receiver',
      productId: 1,
      userId: 1,
      fromBranchId: 1,
      toBranchId: 2,
    };
  
    return request(app.getHttpServer())
      .post('/transfer-products')
      .send(dto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          date: dto.date.toISOString(), 
          folio: dto.folio,
          observations: dto.observations,
          driver: dto.driver,
          assistant: dto.assistant,
          receivedBy: dto.receivedBy,
          productId: dto.productId,
          userId: dto.userId,
          fromBranchId: dto.fromBranchId,
          toBranchId: dto.toBranchId,
        }));
      });
  });

  it('/GET transfer-products', () => {
    return request(app.getHttpServer())
      .get('/transfer-products')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            date: expect.any(String),
            folio: 'F123',
            observations: 'Observation 1',
            driver: 'Driver 1',
            assistant: 'Assistant 1',
            receivedBy: 'Receiver 1',
            productId: 1,
            userId: 1,
            fromBranchId: 1,
            toBranchId: 2,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            date: expect.any(String),
            folio: 'F124',
            observations: 'Observation 2',
            driver: 'Driver 2',
            assistant: 'Assistant 2',
            receivedBy: 'Receiver 2',
            productId: 2,
            userId: 2,
            fromBranchId: 1,
            toBranchId: 2,
          }),
        ]));
      });
  });

  it('/GET transfer-products/:id', () => {
    const id = 1;
    return request(app.getHttpServer())
      .get(`/transfer-products/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id,
          date: expect.any(String),
          folio: `F${id}`,
          observations: `Observation ${id}`,
          driver: `Driver ${id}`,
          assistant: `Assistant ${id}`,
          receivedBy: `Receiver ${id}`,
          productId: id,
          userId: id,
          fromBranchId: 1,
          toBranchId: 2,
        }));
      });
  });

  it('/PUT transfer-products/:id', async () => {
    const dto: CreateTransferProductDto = {
      date: new Date(),
      folio: 'F126',
      observations: 'Updated Observation',
      driver: 'Updated Driver',
      assistant: 'Updated Assistant',
      receivedBy: 'Updated Receiver',
      productId: 4,
      userId: 4,
      fromBranchId: 1,
      toBranchId: 2,
    };
    const id = 1;
  
    return request(app.getHttpServer())
      .put(`/transfer-products/${id}`)
      .send(dto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id: id,
          date: dto.date.toISOString(),
          folio: dto.folio,
          observations: dto.observations,
          driver: dto.driver,
          assistant: dto.assistant,
          receivedBy: dto.receivedBy,
          productId: dto.productId,
          userId: dto.userId,
          fromBranchId: dto.fromBranchId,
          toBranchId: dto.toBranchId,
        }));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
