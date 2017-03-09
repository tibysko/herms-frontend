export interface System {
    HLT: HLTValueMap,
    HE: HEValueMap
}

export interface HLTValueMap {
    waterLevel: number
}


export interface HEValueMap {
    HeHwInActPos: number
}