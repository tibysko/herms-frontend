

export class PidControllerModal {
    constructor(
        public mode: string,
        public longName: string,
        public name: string,
        public kp: number,
        public ki: number,
        public kd: number,
        public output: number,
        public setPoint: number, 
        public outputLimits: OutputLimitsValueMap,
    ) { }
}

export class OutputLimitsValueMap {
    constructor(
    public min: number,
    public max: number
    ) { }
}