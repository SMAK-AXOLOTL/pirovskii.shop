import {skiTypeEnum} from "./skiTypeEnum";

export type skiType = skiModelType[]

export type skiModelType = {
    id: string,
    type: skiTypeEnum,
    name: string,
    skiImg: string,
    hardTrack: lengthType[],
    universalTrack: lengthType[]
}

export type lengthType = {
    lengthString: string,
    weights: weightType[]
}

export type weightType = {
    weightString: string,
    isReserved: boolean
}

export type skiPolesType = skiPoleType[]

export type skiPoleType = {
    id: string,
    name: string,
    poleImg: string,
    lengthArray: string[]
}