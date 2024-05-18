import {skiPoleType} from "../../utils/types";


/**
 *
 * @param skiPole - a ski pole to validate
 * @param allSkiPolesData - an optional ski poles array to use when validating existing ski pole
 */
export function validateSkiPole(skiPole: skiPoleType, allSkiPolesData?: skiPoleType[]) {
    let error = ''
    if (!skiPole.id || skiPole.id === '') {
        error = "ID is required"
        return error
    } else if (allSkiPolesData && allSkiPolesData.filter((value) => value.id === skiPole.id).length > 0) {
        error = "ID must be unique"
        return error
    } else if (!skiPole.name || skiPole.name === '') {
        error = "Ski pole name is required"
        return error
    } else if (!skiPole.desc || skiPole.desc === '') {
        error = "Ski pole description is required"
        return error
    } else if (!skiPole.priceInRubles || skiPole.priceInRubles <= 0) {
        error = "Ski pole price is required and cannot be less or equal to 0"
        return error
    }else if(!skiPole.poleImg || skiPole.poleImg === ''){
        error = "Ski must have an image"
        return error
    }else if (skiPole.lengthArray.length <= 0) {
        error = "You can't create new ski without tracks"
        return error
    }
    return error
}