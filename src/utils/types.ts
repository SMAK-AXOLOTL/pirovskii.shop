export type skiType = {
    models?: skiModelType[]
}

export type skiModelType = {
    id: string,
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