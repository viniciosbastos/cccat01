import Item from "./Item";
import Order from "./Order"

export default class OrderMapper {

    static mapToDomain(input: any): Order {
        const order = new Order();
        order.cpf = input.cpf;

        if (input.items) {
            const items = input.items?.map((item: any) => new Item(item.name, item.quantity, item.price))
            order.items = items;
        }
        if (input.coupons) {
            const coupons = input.coupons?.map((coupon: any) => new Item(coupon.name, coupon.quantity, coupon.price))
            order.coupons = coupons;
        }
        return order;
    }

}