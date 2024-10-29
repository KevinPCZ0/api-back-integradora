import { GoodsExit } from "../entities/goodsExit.entity";

export interface GoodExitRepository {

  create(goodExit: GoodsExit);

  findAll();

  findOne(id: number);

  update(id: number, goodExit: GoodsExit);

}