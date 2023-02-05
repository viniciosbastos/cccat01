import axios from "axios";
import Item from "../src/Item";
import Order from "../src/Order";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

test("Deveria emitir erro para cpf invalido", async function() {
    const input = {
        cpf: "09738747500"
    };
    const response = await axios.post("http://localhost:3000/checkout", input, config);
    const output = response.data;
    expect(output.message).toBe("CPF invalido");
});

test("Deveria retornar valor total do pedido com 3 itens", async function() {
    let order = new Order("09738747597", [
        new Item("A", 3, 10.0),
        new Item("B", 1, 50.0),
        new Item("C", 4, 25.0),
    ]);
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.valor).toBe(180.0);
});