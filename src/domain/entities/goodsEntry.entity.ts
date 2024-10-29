export class GoodsEntry {
  constructor(

    public readonly date: Date,
    public readonly quantity: number,
    public readonly color: string,
    public readonly folio: string,
    public readonly observation: string,
    public readonly origin: string,
    public readonly driver: string,
    public readonly assistant: string,
    public readonly reciveBy: string,
    public readonly entryTime: Date,
    public readonly productId: number,
    public readonly userId: number,
  ) {}
}
