import {skiTypeEnum} from "../enums/skiTypeEnum";

export type skiType = skiModel[]

export interface skiModel {
    id: string,
    type: skiTypeEnum,
    name: string,
    desc: string,
    priceInRubles: number,
    skiImgArr: string[],
    hardTrack: skiLengthType[],
    universalTrack: skiLengthType[]
}

export interface skiLengthType{
    lengthString: string,
    weights: skiWeightType[]
}

export interface skiWeightType{
    weightString: string,
    isReserved: boolean
}


export type skiViewAllType = skiViewAllModel[]

export type skiViewAllModel = {
    id: string,
    name: string,
    type: skiTypeEnum,
    desc: string,
    skiImg: string
}

export type skiPolesType = skiPoleType[]

export interface skiPoleType{
    id: string,
    name: string,
    desc: string,
    priceInRubles: number,
    poleImg: string,
    lengthArray: skiPoleLengthType[]
}


export interface skiPoleLengthType{
    lengthString: string,
    isReserved: boolean
}
