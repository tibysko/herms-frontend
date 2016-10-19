export interface PidControllerConfig {
    mode: string;
    kp: number;
    ki: number;
    kd: number;
    output: number;
    setPoint: number;
}
