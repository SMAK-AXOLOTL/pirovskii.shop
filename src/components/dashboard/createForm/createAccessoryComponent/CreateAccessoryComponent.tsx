import React, {useEffect} from "react";
import styles from '../createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {setCreateUiOpen} from "../../../../redux/appStateSlice";
import AccessoryFormComponent from "../../formContent/accessoryForm/AccessoryFormComponent";
import {
    clearNewAccessoryData,
    createAccessory,
    selectAccessoriesData,
    selectNewAccessoryData
} from "../../../../redux/accessoriesSlice";
import {validateAccessory} from "../../../../commonFunctions/validationFunctions/accessoryValidationFunctions";

const CreateAccessoryComponent = () => {
    const accessory = useAppSelector(selectNewAccessoryData)
    const allAccessoriesData = useAppSelector(selectAccessoriesData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearNewAccessoryData())
    }, [dispatch]);
    
    function handleCreateClick() {
        const validationError = validateAccessory(accessory, allAccessoriesData)
        if (validationError !== '') {
            alert(validationError)
        } else {
            dispatch(createAccessory(accessory))
            dispatch(setCreateUiOpen())
        }
    }

    return <div className={styles.createForm}>
        <AccessoryFormComponent isInitialized={false}/>
        <button onClick={handleCreateClick} className={styles.redButton}>
            Добавить
        </button>
    </div>
}

export default CreateAccessoryComponent