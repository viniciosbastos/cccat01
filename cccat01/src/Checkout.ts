import Cpf from "./CpfValidator";
import OrderMapper from "./OrderMapper";

export default class Checkout {

    execute(input: Input): any {
        let order = OrderMapper.mapToDomain(input);
        if (!Cpf.validate(order.cpf)) throw new Error("CPF invalido");
        return {valor: order.getTotal()}
    }
}

type Input = {
    cpf: string,
    items: ItemInput[],
    coupons: CouponInput[]
}

type ItemInput = {
    quantity: number,
    price: number
}

type CouponInput = {
    code: string,
    discount: number,
    expireDate: string
}