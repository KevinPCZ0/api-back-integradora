import { TransferProduct } from "../entities/transferProduct.entity";

export interface TransferProductRepository {

  create(transferProduct: TransferProduct );

  findAll();

  findOne(id: number);

  update(id: number, transferProduct: TransferProduct);

}