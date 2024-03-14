export type skatingType = {
    models: skatingModelType[]
}

export type skatingModelType = {
    name: string,
    skiImg: string,
    hardTrack?: lengthType[],
    universalTrack?: lengthType[]
}

export type lengthType = {
    lengthString: string,
    weights: weightType[]
}

export type weightType = {
    weightString: string,
    isReserved: boolean
}