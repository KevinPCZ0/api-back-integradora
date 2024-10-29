import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { FreightController } from '../infrastructure/controllers/freight.controller';
import { FreightService } from '../domain/services/freight.service';
import { PrismaFreightRepository } from '../infrastructure/prisma/prisma-freight-repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';


@Module({
  imports: [PrismaModule],
  controllers: [FreightController],
  providers: [
    FreightService,
    PrismaService,{
        provide: 'FreightRepository',
        useClass: PrismaFreightRepository,
    },
  ],
  exports: [FreightService],
})
export class FreightModule {}
