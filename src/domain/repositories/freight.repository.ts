import { Freight } from "../entities/freight.entity";

export interface FreightRepository {

  create(freight: Freight)

  findAll();

  findOne(id: number);

  update(id: number, freight: Freight);

}