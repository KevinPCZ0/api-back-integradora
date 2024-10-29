import {  Inject, Injectable } from '@nestjs/common';
import { CreateGoodsEntryDto } from 'src/application/dtos/create-goodsEntry.dto';
import { GoodsEntryRepository } from 'src/domain/repositories/goodsEntry.repository';
import { GoodsEntry } from '../entities/goodsEntry.entity';



@Injectable()
export class GoodsEntryService {
  constructor(@Inject('GoodsEntryRepository') private readonly goodsEntryRepository: GoodsEntryRepository) {}
  create( createGoodEntryDto: CreateGoodsEntryDto): Promise<GoodsEntry>{
    const { date, quantity, color, folio, observation, origin, driver, assistant, reciveBy, entryTime, productId, userId } = createGoodEntryDto;
    const Entry = new GoodsEntry( date, quantity, color, folio, observation, origin,driver, assistant, reciveBy, entryTime, productId, userId)
    return this.goodsEntryRepository.create(Entry);
  }

  findAll() {
    return this.goodsEntryRepository.findAll();
  }

  findOne(id: number) {
    return this.goodsEntryRepository.findOne(id);
  }

  async update(id:number, updateGoodEntryDto: CreateGoodsEntryDto): Promise<GoodsEntry> {
    const { date, quantity, color, folio, observation, origin, driver, assistant, reciveBy, entryTime, productId, userId } = updateGoodEntryDto;
    const updatedGoodsEntry = {  date, quantity, color, folio, observation, origin,driver, assistant, reciveBy, entryTime, productId, userId};
   return this.goodsEntryRepository.update(id, updatedGoodsEntry);
}

}
