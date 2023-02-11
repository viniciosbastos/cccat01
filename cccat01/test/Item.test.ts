import Item from "../src/Item"

test("Deveria retornar 20 para um item com valor 10 e quantidade 2", function() {
    let item = new Item("A", 2, 10);
    expect(item.getPrice()).toBe(20);
})

test("Não deveria emitir erro ao validar Item", function() {
    let item = new Item("A", 2, 10);
    expect(() => item.validate()).not.toThrow(new Error());
})

test("Deveria emitir erro ao validar item com quantidade zero", function() {
    let item = new Item("A", 0, 10);
    expect(() => item.validate()).toThrow(new Error("Invalid quantity"));
})