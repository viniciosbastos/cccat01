export default class Coupon {
    constructor(readonly name: string, readonly discount: number, readonly expireDate: Date) {}

    isExpired(): boolean {
        const currentDateString = new Date().toLocaleDateString();
        return this.expireDate < new Date(currentDateString);
    }
}