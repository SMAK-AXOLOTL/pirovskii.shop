import React from "react";
import styles from '../../createForm/createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {validateAccessory} from "../../../../commonFunctions/validationFunctions/accessoryValidationFunctions";
import {setIsUpdateAccessoryUiOpen} from "../../../../redux/appStateSlice";
import {
    selectAccessoriesData,
    selectNewAccessoryData,
    setAccessoryDataByIndex,
    updateOneAccessoryData
} from "../../../../redux/accessoriesSlice";
import AccessoryFormComponent from "../../formContent/accessoryForm/AccessoryFormComponent";

type PropsType = {
    index: number
}

const UpdateAccessoryComponent: React.FC<PropsType> = ({index}) => {
    const accessory = useAppSelector(selectNewAccessoryData)
    const initialData = useAppSelector(selectAccessoriesData)[index]
    const dispatch = useAppDispatch()

    function handleUpdateClick() {
        const validationError = validateAccessory(accessory)
        if (validationError !== '') {
            alert(validationError)
        } else {
            const actionPayloadDTO = {index: index, data: accessory}
            dispatch(setAccessoryDataByIndex(actionPayloadDTO))
            dispatch(updateOneAccessoryData({
                    id: accessory.id,
                    data: actionPayloadDTO.data
                }
            ))
            dispatch(setIsUpdateAccessoryUiOpen())
        }
    }

    return <div className={styles.createForm}>
        <AccessoryFormComponent initialData={initialData} isInitialized={true}/>
        <button onClick={handleUpdateClick} className={styles.redButton}>
            Изменить
        </button>
    </div>
}

export default UpdateAccessoryComponent