import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Deve calcular total de pedido com 3 produtos", function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ]);
    let totalValue = order.getTotal();
    expect(totalValue).toBe(180.0);
});

test("Deve calcular total de pedido com 3 produtos e desconto", function() {
    const currentDate = new Date().toLocaleDateString();
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ], [
        new Coupon("A", 0.1, new Date(currentDate))
    ]);
    let totalValue = order.getTotal();
    expect(totalValue).toBe(162.0);
});

test("Não deve aplicar desconto de coupon expirado", function() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const expireDateString = currentDate.toLocaleDateString();
    const order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ], [
        new Coupon("A", 0.1, new Date(expireDateString))
    ]);
    let totalValue = order.getTotal();
    expect(totalValue).toBe(180.0);
});

test("Não deveria emitir erro ao validar pedido", function() {
    const currentDate = new Date().toLocaleDateString(); 
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ], [
        new Coupon("A", 0.1, new Date(currentDate))
    ]);
    expect(() => order.validate()).not.toThrow(new Error());
});

test("Deveria emitir erro Erro Duplicado ao validar pedido", function() {
    const currentDate = new Date().toLocaleDateString(); 
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ], [
        new Coupon("A", 0.1, new Date(currentDate))
    ]);
    expect(() => order.validate()).toThrow(new Error("Duplicate items"));
});