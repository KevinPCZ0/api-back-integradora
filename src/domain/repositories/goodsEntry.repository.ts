import { GoodsEntry } from "../entities/goodsEntry.entity";

export interface GoodsEntryRepository {

  create(goodsEntry: GoodsEntry);

  findAll();

  findOne(id: number);

  update(id: number, goodsEntry: GoodsEntry);

}