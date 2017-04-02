export interface System {
    HLT: HLTValueMap,
    HE: HEValueMap,
    MLT: MLTValueMap  
}

export interface HLTValueMap {
    waterLevel: number
}


export interface HEValueMap {
    HeHwInActPos: number
}

export interface MLTValueMap {
    mltOutTemp: number
}