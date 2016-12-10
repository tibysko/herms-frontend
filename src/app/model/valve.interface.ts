export interface  Valve {
    name: string;
    state: string;
}

export enum ValveState {
    START_CLOSE,
    STOP_CLOSE,
    START_OPEN,
    STOP_OPEN,
    CLOSED,
    OPENED
}
