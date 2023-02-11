import Coupon from "./Coupon";
import Item from "./Item";

export default class Order {
    cpf: string;
    items: Item[];
    coupons: Coupon[];
    id: number = 0;
    totalValue: number = 0;
    totalDiscount: number = 0;
    totalOfItems: number = 0;

    constructor(cpf: string = "", items: Item[] = [], coupons: Coupon[] = []) {
        this.cpf = cpf;
        this.items = items;
        this.coupons = coupons;
    }

    addItem(newItem: Item) {
        this.items.push(newItem);
    }

    getTotal() {
        this.calculateTotalOfItems();
        this.calculateDiscounts();
        return this.totalValue;
    }

    private calculateTotalOfItems() {
        this.totalOfItems = this.items.reduce((accumulator, currentItem) => accumulator + currentItem.getPrice(), 0);
    }

    private calculateDiscounts() {
        this.totalValue = this.totalOfItems;
        this.coupons.forEach(coupon => {
            if (!coupon.isExpired()) {
                let discountValue = this.totalValue * coupon.discount;
                this.totalDiscount += discountValue;
                this.totalValue -= discountValue;
            }
        })
    }

    validate(): any {
        const set = new Set();
        if (this.items.some(item => set.add(item.name))) throw new Error("Duplicate items");
    }
}