
import { Inject, Injectable } from "@nestjs/common";
import { BranchRepository } from './../repositories/branch.repository';
import { Branch } from "../entities/branch.entity";
import { CreateBranchDto } from "src/application/dtos/create-branch.dto";



@Injectable()
export class BranchService {
    constructor(@Inject('BranchRepository') private readonly branchRepository: BranchRepository) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const { name , adress } = createBranchDto 
    const branch = new Branch(name, adress);
    return this.branchRepository.create(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }

  async findOne(id: number): Promise<Branch | null> {
    return this.branchRepository.findOne(id);
  }

  async update(id: number, updateBranchDto: CreateBranchDto): Promise<Branch> {
    const { name , adress } = updateBranchDto
    const updateBranch = { name, adress }
    return this.branchRepository.update(id, updateBranch);
  }

}