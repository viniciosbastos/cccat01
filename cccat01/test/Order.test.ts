import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Deve criar pedido com 3 produtos e calcular total", function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ]);
    let totalValue = order.getTotal();
    expect(totalValue).toBe(180.0);
});

test("Deve criar pedido com 3 produtos e desconto e calcular total", function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ], [
        new Coupon("A", 0.1)
    ]);
    let totalValue = order.getTotal();
    expect(totalValue).toBe(162.0);
});