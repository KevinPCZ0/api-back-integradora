export class TransferProduct{
    constructor(
        public readonly date: Date,
        public readonly folio: string,
        public readonly observations: string,
        public readonly driver: string,
        public readonly assistant: string,
        public readonly receivedBy: string,
        public readonly productId: number,
        public readonly userId: number,
        public readonly fromBranchId: number,
        public readonly toBranchId: number,
    ){}
}