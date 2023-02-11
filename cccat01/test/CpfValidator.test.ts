import Cpf from "../src/CpfValidator";

test("Deveria criar cpf sem erros", function() {
    let cpf = "09738747597";
    Cpf.validate(cpf);
});

test("Deveria retornar false para cpf informado inválido", function() {
    let cpf = "11122233345";
    let isValid = Cpf.validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Deveria retornar erro para entrada menor que 11 caracteres", function() {
    let cpf = "00000000";
    expect(() => Cpf.validate(cpf)).toThrow(new Error("CPF invalido"));
});

test("Deveria retornar erro para entrada maior que 14 caracteres", function() {
    let cpf = "123456789123456";
    let isValid = () => Cpf.validate(cpf);
    expect(isValid).toThrow(new Error("CPF invalido"));
});

test("Deveria retornar erro para entrada com letras", function() {
    let cpf = "0973A747597";
    expect(() => Cpf.validate(cpf)).toThrow(new Error("CPF invalido"));
});

test("Deveria retornar erro para entrada com todos os numeros iguais", function() {
    let cpf = "11111111111";
    expect(() => Cpf.validate(cpf)).toThrow(new Error("CPF invalido"));
});
