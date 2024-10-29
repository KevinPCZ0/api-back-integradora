import { Inject, Injectable } from "@nestjs/common";
import { TransferProductRepository } from "../repositories/transferProduct.repository";
import { CreateTransferProductDto } from "src/application/dtos/create-transferProduct.dto";
import { TransferProduct } from "../entities/transferProduct.entity";

@Injectable()
export class TransferProductService {
  constructor(@Inject('TransferProductRepository') private readonly transferProductRepository: TransferProductRepository) { }
  async create(transferProduct: TransferProduct): Promise<TransferProduct> {
    return await this.transferProductRepository.create(transferProduct);
  }

  async findAll() {
    return this.transferProductRepository.findAll();
  }
  async findOne(id: number) {
    return this.transferProductRepository.findOne(id);
  }
  async update(id: number, updateTransferProduct: CreateTransferProductDto): Promise<TransferProduct> {
    const { date, folio, observations, driver, assistant, receivedBy, fromBranchId, toBranchId, productId, userId } = updateTransferProduct;
    const updateTransfer = { date, folio, observations, driver, assistant, receivedBy, fromBranchId, toBranchId, productId, userId };
    return this.transferProductRepository.update(id, updateTransfer);
  }
}