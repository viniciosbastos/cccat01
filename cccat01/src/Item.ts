export default class Item {
 
    constructor(readonly name: string, readonly quantity: number, readonly price: number) {}

    getPrice() {
        return this.quantity * this.price;
    }

    validate(): any {
        if (this.quantity <= 0) throw new Error("Invalid quantity");
    }
}