import { CreateFreightDto } from '../../application/dtos/create-freight.dto';

import { Inject, Injectable } from "@nestjs/common";
import { FreightRepository } from "../repositories/freight.repository";
import { Freight } from "../entities/freight.entity";



@Injectable()
export class FreightService {

  constructor(@Inject('FreightRepository') private readonly freightRepository: FreightRepository) {}
  async create(createFreightDto : CreateFreightDto): Promise<Freight> {
    const { city, price } = createFreightDto
    const freight = new Freight(city, price);
    return this.freightRepository.create(freight);
  }

  async findAll(): Promise<Freight[]> {
    return this.freightRepository.findAll();
  }

  async findOne(id: number): Promise<Freight | null> {
    return this.freightRepository.findOne(id);
  }

  async update(id: number, updateFreight: CreateFreightDto): Promise<Freight> {
    const { city, price } = updateFreight
    const updatefreight = { city, price }
    return this.freightRepository.update(id, updatefreight);
  }

}