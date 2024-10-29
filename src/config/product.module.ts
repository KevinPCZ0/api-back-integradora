import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ProductController } from '../infrastructure/controllers/product.controller';
import { ProductService } from '../domain/services/product.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PrismaProductRepository } from '../infrastructure/prisma/prisma-product-repository';

@Module({
    imports: [PrismaModule],
    controllers: [ProductController],
    providers: [
      ProductService,
      PrismaService,{
          provide: 'ProductRepository',
          useClass: PrismaProductRepository,
      },
    ],
    exports: [ProductService],
  })
  
  export class ProductModule {}