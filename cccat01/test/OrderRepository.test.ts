import Item from "../src/Item";
import Order from "../src/Order";
import OrderRepository from "../src/OrderRepository";

test("Deveria salvar um pedido", function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ]);
    let repository = new OrderRepository();
    repository.saveOrder(order);
    expect(() => repository.findById(order.id)).not.toThrowError();
});

test("Deveria emitir erro ao tentar recuperar pedido inexistente", function() {
    let repository = new OrderRepository();
    expect(() => repository.findById(99)).toThrow(new Error("Pedido não encontrado"));
});

test("Deveria atualizar um pedido existente", function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ]);
    let repository = new OrderRepository();
    repository.saveOrder(order);
    order.addItem(new Item("D", 1, 12.0));
    repository.updateOrder(order);
    let savedOrder = repository.findById(order.id);
    expect(savedOrder.items.length).toBe(4);
});