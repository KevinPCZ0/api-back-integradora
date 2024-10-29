import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Product);

  findAll();

  findOne(id: number);

  update(id: number, product: Product);

}