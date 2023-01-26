import Item from "../src/Item"

test("Deveria retornar 20 para um item com valor 10 e quantidade 2", function() {
    let item = new Item("A", 2, 10);
    expect(item.getPrice()).toBe(20);
})