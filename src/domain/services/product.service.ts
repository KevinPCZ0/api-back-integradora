import { Inject, Injectable } from '@nestjs/common';
/* */
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../application/dtos/create-product.dto';


@Injectable()
export class ProductService {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
      const { name, brand, model, description, category, stock, productCode, status, branchId } = createProductDto;
      const product = new Product(name, brand, model, description, category, stock, productCode, status, branchId );
      return this.productRepository.create( product);
   }
  
    async findAll(): Promise<Product> {
      return this.productRepository.findAll();
    }
 
    async findOne(id: number): Promise<Product | null> {
      return this.productRepository.findOne(id);
    }
  
    async update(id: number, updateProductDto:CreateProductDto ): Promise<Product> {
      const { name, brand, model, description, category, stock, productCode, status, branchId } = updateProductDto;
      const updatedProduct = { name, brand, model, description, category, stock, productCode, status, branchId };
      return this.productRepository.update(id, updatedProduct);
  }
}

