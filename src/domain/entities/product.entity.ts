import { Status } from "@prisma/client";

export class Product {
    constructor(
      public readonly name: string,
      public readonly brand: string,
      public readonly model: string,
      public readonly description: string,
      public readonly category: string,
      public readonly stock: number,
      public readonly productCode: number,
      public readonly status: Status,
      public readonly branchId?: number
    ) {}
  }