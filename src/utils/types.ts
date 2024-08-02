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

export interface skiLengthType {
    lengthString: string,
    weights: skiWeightType[]
}

export interface skiWeightType {
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

export interface skiPoleType {
    id: string,
    name: string,
    desc: string,
    priceInRubles: number,
    poleImgArr: string[],
    lengthArray: skiPoleLengthType[]
}

export interface skiPoleLengthType {
    lengthString: string,
    isReserved: boolean
}

export type skiPoleViewAllType = skiPoleViewAllModel[]

export type skiPoleViewAllModel = {
    id: string,
    name: string,
    desc: string,
    poleImg: string
}


export type accessoriesType = accessoryType[]

export interface accessoryType {
    id: string,
    name: string,
    desc: string,
    priceInRubles: number,
    sizesArray: accessorySizeType[],
    accessoriesImgArr: string[]
}

export interface accessorySizeType {
    sizeString: string,
    isReserved: boolean
}

export type accessoriesViewAllType = accessoryViewAllModel[]

export type accessoryViewAllModel = {
    id: string,
    name: string,
    desc: string,
    accessoryImg: string
}