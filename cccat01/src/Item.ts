export default class Item {
    constructor(readonly name: string, readonly quantity: number, readonly price: number) {}

    getPrice() {
        return this.quantity * this.price;
    }
}