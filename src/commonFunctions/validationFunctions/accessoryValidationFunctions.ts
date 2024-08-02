import {accessoryType} from "../../utils/types";

/**
 *
 * @param accessory - an accessory to validate
 * @param allAccessoriesData - an optional accessories array to use when validating existing accessory
 */
export function validateAccessory(accessory: accessoryType, allAccessoriesData?: accessoryType[]) {
    let error = ''
    if (!accessory.id || accessory.id === '') {
        error = "ID is required"
        return error
    } else if (allAccessoriesData && allAccessoriesData.filter((value) => value.id === accessory.id).length > 0) {
        error = "ID must be unique"
        return error
    } else if (!accessory.name || accessory.name === '') {
        error = "Accessory name is required"
        return error
    } else if (!accessory.desc || accessory.desc === '') {
        error = "Accessory description is required"
        return error
    } else if (!accessory.priceInRubles || accessory.priceInRubles <= 0) {
        error = "Accessory price is required and cannot be less or equal to 0"
        return error
    }else if(!accessory.accessoriesImgArr || accessory.accessoriesImgArr.includes('')){
        error = "Accessory must have an image"
        return error
    }else if (accessory.sizesArray.length <= 0) {
        error = "You can't create new accessory without sizes"
        return error
    }
    return error
}