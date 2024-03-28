import {skiTypeEnum} from "./skiTypeEnum";

export type skiType = skiModelType[]

export type skiModelType = {
    id: string,
    type: skiTypeEnum,
    name: string,
    skiImg: string,
    hardTrack: skiLengthType[],
    universalTrack: skiLengthType[]
}

export type skiLengthType = {
    lengthString: string,
    weights: skiWeightType[]
}

export type skiWeightType = {
    weightString: string,
    isReserved: boolean
}

export type skiPolesType = skiPoleType[]

export type skiPoleType = {
    id: string,
    name: string,
    poleImg: string,
    lengthArray: skiPoleLengthType[]
}

export type skiPoleLengthType = {
    lengthString: string,
    isReserved: boolean
}