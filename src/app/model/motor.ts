
export class Motor {
    private pin: string
    private name: string;

    constructor(name: string, pin: string) {
        this.pin = pin;
        this.name = name;        
    }

    getName(): string {
        return this.name;
    }

    getPin(): string {
        return this.pin;
    }
}