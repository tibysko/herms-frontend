export interface PidControllerConfig {
    mode: string;
    kp: number;
    ki: number;
    kd: number;
    output: number;
    setPoint: number;
    outputLimits: OutputLimitsValueMap;
    errThreshold: number;
    sampleTime: number;
}
export interface OutputLimitsValueMap {
    min: number;
    max: number;
}

