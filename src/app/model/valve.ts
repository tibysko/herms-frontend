export enum ValveStatus {
    OPENED = 1,
    CLOSED = 2,
    ADJUSTING = 3
}

export class Valve {
    private status: ValveStatus;
    private name: string;

    constructor() {
        this.status = ValveStatus.ADJUSTING;
    }

    setStatus(status: ValveStatus) {
        this.status = status;
    }

    getStatus(){
        return this.status;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }
}