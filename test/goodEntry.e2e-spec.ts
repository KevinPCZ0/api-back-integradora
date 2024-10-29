import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateGoodsEntryDto } from '../src/application/dtos/create-goodsEntry.dto';
import { GoodsEntryService } from '../src/domain/services/goodsEntry.service';


describe('GoodsEntryController (e2e)', () => {
  let app: INestApplication;
  let goodsEntryService = {
    create: jest.fn((dto: CreateGoodsEntryDto) => ({
      id: Date.now(),
      ...dto,
      entryTime: dto.entryTime.toISOString(),
    })),
    findAll: jest.fn(() => [
      {
        id: 1,
        date: new Date().toISOString(),
        quantity: 10,
        color: 'Red',
        folio: 'G123',
        observation: 'Observation 1',
        origin: 'Origin 1',
        driver: 'Driver 1',
        assistant: 'Assistant 1',
        reciveBy: 'Receiver 1',
        entryTime: new Date().toISOString(),
        productId: 1,
        userId: 1,
      },
      {
        id: 2,
        date: new Date().toISOString(),
        quantity: 20,
        color: 'Blue',
        folio: 'G124',
        observation: 'Observation 2',
        origin: 'Origin 2',
        driver: 'Driver 2',
        assistant: 'Assistant 2',
        reciveBy: 'Receiver 2',
        entryTime: new Date().toISOString(),
        productId: 2,
        userId: 2,
      },
    ]),
    findOne: jest.fn((id: number) => ({
      id: Number(id),
      date: new Date().toISOString(),
      quantity: 10,
      color: 'Red',
      folio: `G${id}`,
      observation: `Observation ${id}`,
      origin: `Origin ${id}`,
      driver: `Driver ${id}`,
      assistant: `Assistant ${id}`,
      reciveBy: `Receiver ${id}`,
      entryTime: new Date().toISOString(),
      productId: Number(id),
      userId: Number(id),
    })),
    update: jest.fn((id: number, dto: CreateGoodsEntryDto) => ({
      id: Number(id),
      ...dto,
      entryTime: dto.entryTime.toISOString(),
    })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GoodsEntryService)
      .useValue(goodsEntryService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST goods-entries', async () => {
    const dto: CreateGoodsEntryDto = {
      date: new Date(),
      quantity: 15,
      color: 'Green',
      folio: 'G125',
      observation: 'New Observation',
      origin: 'New Origin',
      driver: 'New Driver',
      assistant: 'New Assistant',
      reciveBy: 'New Receiver',
      entryTime: new Date(),
      productId: 3,
      userId: 3,
    };

    return request(app.getHttpServer())
      .post('/goods-entries')
      .send(dto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          date: dto.date.toISOString(),
          quantity: dto.quantity,
          color: dto.color,
          folio: dto.folio,
          observation: dto.observation,
          origin: dto.origin,
          driver: dto.driver,
          assistant: dto.assistant,
          reciveBy: dto.reciveBy,
          entryTime: dto.entryTime.toISOString(),
          productId: dto.productId,
          userId: dto.userId,
        }));
      });
  });

  it('/GET goods-entries', () => {
    return request(app.getHttpServer())
      .get('/goods-entries')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            date: expect.any(String),
            quantity: expect.any(Number),
            color: 'Red',
            folio: 'G123',
            observation: 'Observation 1',
            origin: 'Origin 1',
            driver: 'Driver 1',
            assistant: 'Assistant 1',
            reciveBy: 'Receiver 1',
            entryTime: expect.any(String),
            productId: 1,
            userId: 1,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            date: expect.any(String),
            quantity: expect.any(Number),
            color: 'Blue',
            folio: 'G124',
            observation: 'Observation 2',
            origin: 'Origin 2',
            driver: 'Driver 2',
            assistant: 'Assistant 2',
            reciveBy: 'Receiver 2',
            entryTime: expect.any(String),
            productId: 2,
            userId: 2,
          }),
        ]));
      });
  });

  it('/GET goods-entries/:id', () => {
    const id = 1;
    return request(app.getHttpServer())
      .get(`/goods-entries/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id,
          date: expect.any(String),
          quantity: expect.any(Number),
          color: 'Red',
          folio: `G${id}`,
          observation: `Observation ${id}`,
          origin: `Origin ${id}`,
          driver: `Driver ${id}`,
          assistant: `Assistant ${id}`,
          reciveBy: `Receiver ${id}`,
          entryTime: expect.any(String),
          productId: id,
          userId: id,
        }));
      });
  });

  it('/PUT goods-entries/:id', async () => {
    const dto: CreateGoodsEntryDto = {
      date: new Date(),
      quantity: 25,
      color: 'Yellow',
      folio: 'G126',
      observation: 'Updated Observation',
      origin: 'Updated Origin',
      driver: 'Updated Driver',
      assistant: 'Updated Assistant',
      reciveBy: 'Updated Receiver',
      entryTime: new Date(),
      productId: 4,
      userId: 4,
    };
    const id = 1;

    return request(app.getHttpServer())
      .put(`/goods-entries/${id}`)
      .send(dto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          id,
          date: dto.date.toISOString(),
          quantity: dto.quantity,
          color: dto.color,
          folio: dto.folio,
          observation: dto.observation,
          origin: dto.origin,
          driver: dto.driver,
          assistant: dto.assistant,
          reciveBy: dto.reciveBy,
          entryTime: dto.entryTime.toISOString(),
          productId: dto.productId,
          userId: dto.userId,
        }));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
