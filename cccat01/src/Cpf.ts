export default class Cpf {

    private INDEX_OFFSET = 2;
    private MIN_REST = 2;
    private MIN_VERIFIER = 0;
    private LENGTH = 11;

    constructor(readonly cpf: string) {
        let isValid = this.validate();
        if (!isValid) throw new Error("CPF invalido");
    }

    private validate(): boolean {
        if (this.cpf == null) throw new Error("CPF invalido");
        if (!this.hasValidLength()) throw new Error("CPF invalido");
        if (!this.containsOnlyNumbers()) throw new Error("CPF invalido");
        if (this.containsOnlyEqualNumbers()) throw new Error("CPF invalido");

        let cpfOnlyNumbers = this.cpf
            .replace('.','')
            .replace('-','')
            .replace(" ","");  
        let cpfBaseValue = cpfOnlyNumbers.substring(0, 9);
        const verifier1 = this.calculateVerifier(cpfBaseValue)
        const verifier2 = this.calculateVerifier(cpfBaseValue+verifier1)
        return this.cpf == (cpfBaseValue+verifier1+verifier2);
    }

    private containsOnlyNumbers(): boolean { return /^[0-9]+$/.test(this.cpf); }

    private containsOnlyEqualNumbers(): boolean { return this.cpf.split("").every(c => c === this.cpf[0]); }

    private hasValidLength(): boolean { return this.cpf.length >= 11 && this.cpf.length <= 14; }

    private calculateVerifier(base: string): number {
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