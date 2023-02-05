import Coupon from "./Coupon";
import Item from "./Item";

export default class Order {

    id: number = 0;
    totalValue: number = 0;
    totalDiscount: number = 0;
    totalOfItems: number = 0;

    constructor(readonly cpf: string, readonly items: Item[], readonly coupons?: Coupon[]) {
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
        console.log(this.items.at(1)?.getPrice())
        this.totalOfItems = this.items.reduce((accumulator, currentItem) => accumulator + currentItem.getPrice(), 0);
    }

    private calculateDiscounts() {
        this.coupons?.forEach(coupon => {
            let discountValue = this.totalValue * coupon.discount;
            coupon.discountValue = discountValue;
            this.totalValue -= discountValue;
        })
    }
}