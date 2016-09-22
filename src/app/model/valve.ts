export enum ValveStatus {
    OPENED = 1,
    CLOSED = 2,
    ADJUSTING = 3
}

export class Valve {
    private status: ValveStatus;

    constructor() {
        this.status = ValveStatus.ADJUSTING;
    }

    setStatus(status: ValveStatus) {
        this.status = status;
    }

    getStatus(){
        return this.status;
    }
}