import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { GoodsEntryService } from '../domain/services/goodsEntry.service';
import { GoodsEntryController } from '../infrastructure/controllers/goodsEntry.controller';
import { PrismaGoodsEntryRepository } from '../infrastructure/prisma/prisma-goodsEntry-repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';


@Module({
  imports: [PrismaModule],
  controllers: [GoodsEntryController],
  providers: [
    GoodsEntryService,
    PrismaService,{
        provide: 'GoodsEntryRepository',
        useClass: PrismaGoodsEntryRepository,
    },
  ],
  exports: [GoodsEntryService],
})

export class GoodsEntryModule {}
  