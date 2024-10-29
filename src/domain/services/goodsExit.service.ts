import {  Inject, Injectable } from '@nestjs/common';
import { GoodExitRepository } from 'src/domain/repositories/goodsExit.repository';
import { GoodsExit } from '../entities/goodsExit.entity';
import { CreateGoodExitDto } from 'src/application/dtos/create-goodsExit.dto';

@Injectable()
export class GoodsExitService {
  constructor(@Inject('GoodsExitRepository') private readonly goodsExitRepository: GoodExitRepository) {}
 create(createGoodsExitDto: CreateGoodExitDto): Promise<GoodsExit> {
  const{date, quantity, color, saleNumber, paymentType, location, driver, assistant, deliveredBy, productId, exitTime,  userId,freightID} = createGoodsExitDto;
  const Exit = new GoodsExit(date, quantity, color, saleNumber, paymentType, location, driver, assistant, deliveredBy,  exitTime, productId,  userId,freightID)
  return this.goodsExitRepository.create(Exit);
  }

  async findAll() {
    return this.goodsExitRepository.findAll();
  }

  async findOne(id: number) {
    return this.goodsExitRepository.findOne(id);
  }

  async update(id: number, updateGoodsExitDto: CreateGoodExitDto): Promise<GoodsExit> {
  const{date, quantity, color, saleNumber, paymentType, location, driver, assistant, deliveredBy, productId, exitTime,  userId,freightID} = updateGoodsExitDto;
  const updateGoodExit = new GoodsExit(date, quantity, color, saleNumber, paymentType, location, driver, assistant, deliveredBy, exitTime, productId, userId,freightID)
    return this.goodsExitRepository.update(id, updateGoodExit);
  }


}
