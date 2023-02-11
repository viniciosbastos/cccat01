import Coupon from "../src/Coupon"


test("Deve retornar falso se cupom não expirado", function() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    const expireDateString = currentDate.toLocaleDateString();
    const coupon = new Coupon("TESTE", 0.10, new Date(expireDateString));
    const isExpired = coupon.isExpired();
    expect(isExpired).toBeFalsy();
});

test("Deve retornar verdadeiro se cupom expirado", function() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const expireDateString = currentDate.toLocaleDateString();
    const coupon = new Coupon("TESTE", 0.10, new Date(expireDateString));
    const isExpired = coupon.isExpired();
    expect(isExpired).toBeTruthy();
});