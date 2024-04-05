import {skiLengthType, skiModel} from "../utils/types";

/**
 * @param track an array of ski lengths to validate
 */
export function validateTrack(track: skiLengthType[]){
    for(let i = 0; i < track.length; i++){
        for(let j = i+1; j < track.length; j++){
            if(track[i].lengthString === track[j].lengthString){
                return true
            }
        }
    }
    return false
}

/**
 * @param ski a ski to validate
 * @param allSkiData optional array of all skis param to validate NEW ski against (skip if validating existing ski)
 */
export function validateSki(ski: skiModel, allSkiData?: skiModel[]) {
    let error = ''
    if (!ski.id || ski.id === '') {
        error = "ID is required"
        return error
    } else if (allSkiData && allSkiData.filter((value) => value.id === ski.id).length > 0) {
        error = "ID must be unique"
        return error
    } else if (!ski.name || ski.name === '') {
        error = "Ski name is required"
        return error
    } else if(!ski.skiImg || ski.skiImg === ''){
        error = "Ski must have an image"
        return error
    }
    else if (ski.hardTrack.length <= 0 && ski.universalTrack.length <= 0) {
        error = "You can't create new ski without tracks"
        return error
    }else if(validateTrack(ski.hardTrack)){
        error = 'All hard tracks must have unique names'
        return error
    }else if(validateTrack(ski.universalTrack)) {
        error = 'All universal tracks must have unique names'
        return error
    }else if (ski.hardTrack.map((track, index) => {
        if (track.weights.length <= 0) {
            error = `Hard track number ${index + 1} doesn't have weights`
        }
        return null
    })) {
        return error
    }
    return error
}