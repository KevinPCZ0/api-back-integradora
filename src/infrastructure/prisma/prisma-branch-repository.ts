import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Branch } from '../../domain/entities/branch.entity';
import { CreateBranchDto } from 'src/application/dtos/create-branch.dto';


@Injectable()
export class PrismaBranchRepository {
  constructor(private prisma: PrismaService) {}

  async create(branch: Branch): Promise<Branch> {
    const existingBranch = await this.prisma.branch.findFirst({
      where: {
        name: branch.name,
        adress: branch.adress,
      },
    });
  
    if (existingBranch) {
      throw new BadRequestException('La sucursal ya existe');
    }
    return this.prisma.branch.create({ data: branch });
  }

  async findAll(): Promise<Branch[]> {
    return this.prisma.branch.findMany();
  }

  async findOne(id: string): Promise<Branch | null> {
    const numericId = parseInt(id, 10); // Convert the string to an integer
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format'); // Handle invalid conversion
    }
    return this.prisma.branch.findUnique({ where: { id: numericId } });
  }

  

  async update(id: string, branch: CreateBranchDto): Promise<Branch> {
    const parsedId = parseInt(id, 10);
    // Check if the TransferProduct exists
    const existingBranch = await this.prisma.branch.findUnique({
      where: { id: parsedId },
    });

    if (!existingBranch) {
      throw new Error(`Branch with ID ${parsedId} not found.`);
    }
    const updatedBranch = await this.prisma.branch.update({
      where: { id: parsedId },
      data: branch,
    });
    return new Branch(
      updatedBranch.name,
      updatedBranch.adress,
    );
  }
  private isValidCreatebranch(Branch: CreateBranchDto): boolean {
    return Boolean(Branch.name && Branch.adress )
  }
  private isValidUpdatebranch(transferProduct: CreateBranchDto): boolean {
    return Boolean(Branch.name )
  }
}