import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";

export default class Order {

    id: number = 0;
    cpf: Cpf;
    items: Item[];
    coupons: Coupon[];
    totalValue: number = 0;
    totalDiscount: number = 0;
    totalOfItems: number = 0;

    constructor(cpf: string, items: Item[], coupons?: Coupon[]) {
        this.cpf = new Cpf(cpf);
        this.items = items;
        this.coupons = coupons ?? [];
    }

    addItem(newItem: Item) {
        this.items.push(newItem);
    }

    getTotal() {
        this.calculateTotalOfItems();
        this.totalValue = this.totalOfItems;
        this.calculateDiscounts();
        return this.totalValue;
    }

    private calculateTotalOfItems() {
        this.totalOfItems = this.items.reduce((accumulator, currentItem) => accumulator + currentItem.getPrice(), 0);
    }

    private calculateDiscounts() {
        this.coupons.forEach(coupon => {
            let discountValue = this.totalValue * coupon.discount;
            coupon.discountValue = discountValue;
            this.totalValue -= discountValue;
        })
    }
}