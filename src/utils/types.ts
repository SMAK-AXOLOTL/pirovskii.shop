import {skiTypeEnum} from "./skiTypeEnum";

export type skiType = skiModel[]

export interface skiModel {
    id: string,
    type: skiTypeEnum,
    name: string,
    skiImg: string,
    hardTrack: SkiLength[],
    universalTrack: SkiLength[]
}

export interface skiLengthType{
    lengthString: string,
    weights: skiWeightType[]
}

export class SkiLength implements skiLengthType{
    lengthString: string;
    weights: skiWeightType[];

    constructor(lengthString?: string, weights?: skiWeightType[]) {
        this.lengthString = lengthString ?? '180';
        this.weights = weights ?? [new SkiWeight()];
    }
}

export interface skiWeightType{
    weightString: string,
    isReserved: boolean
}

export class SkiWeight implements skiWeightType{
    weightString: string;
    isReserved: boolean;


    constructor(weightString?: string, isReserved?: boolean) {
        this.weightString = weightString ?? '75-80';
        this.isReserved = isReserved ?? false;
    }
}

export type skiPolesType = skiPoleType[]

export interface skiPoleType{
    id: string,
    name: string,
    poleImg: string,
    lengthArray: skiPoleLengthType[]
}


export interface skiPoleLengthType{
    lengthString: string,
    isReserved: boolean
}
export class SkiPoleLength implements skiPoleLengthType{
    lengthString: string;
    isReserved: boolean;

    constructor(lengthString?: string, isReserved?: boolean) {
        this.lengthString = lengthString ?? '180';
        this.isReserved = isReserved ?? false;
    }
}
