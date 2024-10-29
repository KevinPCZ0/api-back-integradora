import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module'; 
import { GoodsExitController } from '../infrastructure/controllers/goodsExit.controller';
import { GoodsExitService } from '../domain/services/goodsExit.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PrismaGoodsExitRepository } from '../infrastructure/prisma/prisma-goodExit-repository';

@Module({
  imports: [PrismaModule],
  controllers: [GoodsExitController],
  providers: [
    GoodsExitService,
    PrismaService,{
        provide: 'GoodsExitRepository',
        useClass: PrismaGoodsExitRepository,
    },
  ],
  exports: [GoodsExitService],
})

export class GoodsExitModule {}
  