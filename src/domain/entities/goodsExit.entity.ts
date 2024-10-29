export class GoodsExit{
    constructor(
        public readonly date: Date,
        public readonly quantity: number,
        public readonly color: string,
        public readonly saleNumber: string,
        public readonly paymentType: string,
        public readonly location: string,
        public readonly driver: string,
        public readonly assistant: string,
        public readonly deliveredBy: string,
        public readonly exitTime: Date,
        public readonly productId: number,
        public readonly freightID: number, 
        public readonly userId: number
    ){}
   
}
