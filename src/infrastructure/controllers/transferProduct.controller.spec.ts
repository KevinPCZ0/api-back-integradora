import { Test, TestingModule } from '@nestjs/testing';
import { TransferProductController } from './transferProduct.controller';
import { TransferProductService } from '../../domain/services/transferProduct.service';
import { CreateTransferProductDto } from '../../application/dtos/create-transferProduct.dto';

describe('CRUD de TransferProducts', () => {
  let controller: TransferProductController;
  let service: TransferProductService;

  const mockTransferProductService = {
    create: jest.fn((dto: CreateTransferProductDto) => ({
      id: Date.now(),
      ...dto,
      date: new Date(dto.date).toISOString(), // Asegúrate de que esto devuelva un objeto Date
    })),
    findAll: jest.fn(() => [
      {
        id: 1,
        date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
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
        date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
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
      date: new Date().toISOString(), // Asegúrate de que esto devuelva un objeto Date
      folio: `F${id}`,
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
      date: new Date(dto.date).toISOString(),  // Asegúrate de que esto devuelva un objeto Date
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferProductController],
      providers: [
        {
          provide: TransferProductService,
          useValue: mockTransferProductService,
        },
      ],
    }).compile();

    controller = module.get<TransferProductController>(TransferProductController);
    service = module.get<TransferProductService>(TransferProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Test de Creación', async () => {
    const dto: CreateTransferProductDto = {
      date: new Date(), // Usar Date directamente
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

    const result = await controller.create(dto);

    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
      date: expect.any(String), // Esperar una cadena ISO
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('test de Buscar', async () => {
    const result = await controller.findAll();
    
    expect(result).toEqual([
      {
        id: 1,
        date: expect.any(String), // Esperar una cadena ISO
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
        date: expect.any(String), // Esperar una cadena ISO
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
    ]);
    
    expect(service.findAll).toHaveBeenCalled();
  });

  it('Test de buscar por ID', async () => {
    const id = 1;
    expect(await controller.findOne(id)).toEqual({
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
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('Tests de Actualizar', async () => {
    const dto: CreateTransferProductDto = {
      date: new Date(), // Usar Date directamente
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
    const result = await controller.update(id, dto);

    expect(result).toEqual({
      id,
      ...dto,
      date: expect.any(String), // Esperar una cadena ISO
    });
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });
});
