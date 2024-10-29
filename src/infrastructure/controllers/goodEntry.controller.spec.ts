import { Test, TestingModule } from '@nestjs/testing';
import { GoodsEntryController } from './goodsEntry.controller';
import { GoodsEntryService } from '../../domain/services/goodsEntry.service';
import { CreateGoodsEntryDto } from '../../application/dtos/create-goodsEntry.dto';


describe('CRUD de GoodEntries', () => {
	let controller: GoodsEntryController;
	let service: GoodsEntryService;
  
	const mockGoodsEntryService = {
	  create: jest.fn((dto: CreateGoodsEntryDto) => ({
		id: Date.now(),
		...dto,
		date: new Date(dto.date).toISOString(), // Asegúrate de que esto devuelva un objeto Date
	  })),
	  findAll: jest.fn(() => [
		{
		  id: 1,
		  date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
		  quantity: 10,
		  folio: 'G123',
		  observation: 'Observation 1',
		  driver: 'Driver 1',
		  assistant: 'Assistant 1',
		  reciveBy: 'Receiver 1',
		  productId: 1,
		  userId: 1,
		  color: 'Red',
		  origin: 'Warehouse A',
		  entryTime: new Date().toISOString(),
		},
		{
		  id: 2,
		  date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
		  quantity: 20,
		  folio: 'G124',
		  observation: 'Observation 2',
		  driver: 'Driver 2',
		  assistant: 'Assistant 2',
		  reciveBy: 'Receiver 2',
		  productId: 2,
		  userId: 2,
		  color: 'Blue',
		  origin: 'Warehouse B',
		  entryTime: new Date().toISOString(),
		},
	  ]),
	  findOne: jest.fn((id: number) => ({
		id: Number(id),
		date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
		quantity: 10,
		folio: `G${id}`,
		observation: `Observation ${id}`,
		driver: `Driver ${id}`,
		assistant: `Assistant ${id}`,
		reciveBy: `Receiver ${id}`,
		productId: Number(id),
		userId: Number(id),
		color: 'Red',
		origin: 'Warehouse A',
		entryTime: new Date().toISOString(),
	  })),
	  update: jest.fn((id: number, dto: CreateGoodsEntryDto) => ({
		id: Number(id),
		...dto,
		date: new Date(dto.date).toISOString(),  // Asegúrate de que esto devuelva un objeto Date
	  })),
	};
  
	beforeEach(async () => {
	  const module: TestingModule = await Test.createTestingModule({
		controllers: [GoodsEntryController],
		providers: [
		  {
			provide: GoodsEntryService,
			useValue: mockGoodsEntryService,
		  },
		],
	  }).compile();
  
	  controller = module.get<GoodsEntryController>(GoodsEntryController);
	  service = module.get<GoodsEntryService>(GoodsEntryService);
	});
  
	it('should be defined', () => {
	  expect(controller).toBeDefined();
	});
  
	it('Test de Creación', async () => {
	  const dto: CreateGoodsEntryDto = {
		date: new Date(),
		quantity: 15,
		folio: 'G125',
		observation: 'New Observation',
		driver: 'New Driver',
		assistant: 'New Assistant',
		reciveBy: 'New Receiver',
		productId: 3,
		userId: 3,
		color: 'Green', // Propiedad añadida
		origin: 'Warehouse C', // Propiedad añadida
		entryTime: new Date(), // Propiedad añadida
	  };
  
	  const result = await controller.create(dto);
  
	  expect(result).toEqual({
		id: expect.any(Number),
		...dto,
		date: expect.any(String), // Esperar un objeto Date
	  });
	  expect(service.create).toHaveBeenCalledWith(dto);
	});
  
	it('test de Buscar', async () => {
	  const result = await controller.findAll();
	  
	  expect(result).toEqual([
		{
		  id: 1,
		  date: expect.any(String), // Esperar una cadena ISO
		  quantity: expect.any(Number),
		  folio: 'G123',
		  observation: 'Observation 1',
		  driver: 'Driver 1',
		  assistant: 'Assistant 1',
		  reciveBy: 'Receiver 1',
		  productId: 1,
		  userId: 1,
		  color: 'Red',
		  origin: 'Warehouse A',
		  entryTime: expect.any(String),
		},
		{
		  id: 2,
		  date: expect.any(String), // Esperar una cadena ISO
		  quantity: expect.any(Number),
		  folio: 'G124',
		  observation: 'Observation 2',
		  driver: 'Driver 2',
		  assistant: 'Assistant 2',
		  reciveBy: 'Receiver 2',
		  productId: 2,
		  userId: 2,
		  color: 'Blue',
		  origin: 'Warehouse B',
		  entryTime: expect.any(String),
		},
	  ]);
	  
	  expect(service.findAll).toHaveBeenCalled();
	});
  
	it('Test de buscar por ID', async () => {
	  const id = 1;
	  expect(await controller.findOne(id)).toEqual({
		id,
		date: expect.any(String),
		quantity: expect.any(Number),
		folio: 'G1',
		observation: 'Observation 1',
		driver: 'Driver 1',
		assistant: 'Assistant 1',
		reciveBy: 'Receiver 1',
		productId: 1,
		userId: 1,
		color: 'Red',
		origin: 'Warehouse A',
		entryTime: expect.any(String),
	  });
	  expect(service.findOne).toHaveBeenCalledWith(id);
	});
  
	it('Tests de Actualizar', async () => {
	  const dto: CreateGoodsEntryDto = {
		date: new Date(),
		quantity: 25,
		folio: 'G126',
		observation: 'Updated Observation',
		driver: 'Updated Driver',
		assistant: 'Updated Assistant',
		reciveBy: 'Updated Receiver',
		productId: 4,
		userId: 4,
		color: 'Yellow', // Propiedad añadida
		origin: 'Warehouse D', // Propiedad añadida
		entryTime: new Date(), // Propiedad añadida
	  };
  
	  const id = 1;
	  const result = await controller.update(id, dto);
  
	  expect(result).toEqual({
		id,
		...dto,
		date: expect.any(String), // Esperar un objeto Date
	  });
	  expect(service.update).toHaveBeenCalledWith(id, dto);
	});
  });