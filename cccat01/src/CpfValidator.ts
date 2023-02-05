export default class CpfValidator {

    private static INDEX_OFFSET = 2;
    private static MIN_REST = 2;
    private static MIN_VERIFIER = 0;
    private static LENGTH = 11;

    public static validate(cpf: string): boolean {
        if (cpf == null) throw new Error("CPF invalido");
        if (!this.hasValidLength(cpf)) throw new Error("CPF invalido");
        if (!this.containsOnlyNumbers(cpf)) throw new Error("CPF invalido");
        if (this.containsOnlyEqualNumbers(cpf)) throw new Error("CPF invalido");

        let cpfOnlyNumbers = cpf
            .replace('.','')
            .replace('-','')
            .replace(" ","");  
        let cpfBaseValue = cpfOnlyNumbers.substring(0, 9);
        const verifier1 = this.calculateVerifier(cpfBaseValue)
        const verifier2 = this.calculateVerifier(cpfBaseValue+verifier1)
        return cpf == (cpfBaseValue+verifier1+verifier2);
    }

    private static containsOnlyNumbers(cpf: string): boolean { return /^[0-9]+$/.test(cpf); }

    private static containsOnlyEqualNumbers(cpf: string): boolean { return cpf.split("").every(c => c === cpf[0]); }

    private static hasValidLength(cpf: string): boolean { return cpf.length >= 11 && cpf.length <= 14; }

    private static calculateVerifier(base: string): number {
        let sum = base
                .split("")
                .reverse()
                .map((value) => parseInt(value))
                .reduce((accumulator, currentValue, currentIndex) => {
                    let multiplier = currentIndex + this.INDEX_OFFSET;
                    return accumulator + (currentValue * multiplier);
                }, 0);
        let rest = sum % this.LENGTH;
        if (rest < this.MIN_REST)  
            return this.MIN_VERIFIER;
        else  
            return this.LENGTH - rest;
    }
}