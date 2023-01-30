import Order from "./Order";

export default class OrderRepository {

    static savedOrders: Order[];
    static lastUsedId = 0;

    saveOrder(order: Order): number {
        OrderRepository.lastUsedId += 1;
        order.id = OrderRepository.lastUsedId;
        OrderRepository.savedOrders.push(order);
        return order.id;
    }

    findById(id: number): Order {
        let foundOrder = OrderRepository.savedOrders.find(order => order.id == id);
        if (foundOrder === undefined) throw new Error("Pedido não encontrado");
        return foundOrder;
    }
 
}