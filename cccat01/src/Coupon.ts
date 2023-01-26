export default class Coupon {
    discountValue: number = 0;
    constructor(readonly name: string, readonly discount: number) {}
}