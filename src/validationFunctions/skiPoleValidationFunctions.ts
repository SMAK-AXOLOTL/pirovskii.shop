import {skiPoleType} from "../utils/types";


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
    } else if (skiPole.lengthArray.length <= 0) {
        error = "You can't create new ski without tracks"
        return error
    }
    return error
}