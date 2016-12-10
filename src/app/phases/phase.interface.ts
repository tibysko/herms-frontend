import { Valve } from '../model/valve.interface';

export interface Phase {
    id: string,
    name: string,
    active: boolean,
    valves: Valve[]
}