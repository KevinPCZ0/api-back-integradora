import { Branch } from "../entities/branch.entity"

export interface BranchRepository {
  create(branch: Branch)

  findAll()

  findOne(id: number)

  update(id: number, branch: Branch)

}