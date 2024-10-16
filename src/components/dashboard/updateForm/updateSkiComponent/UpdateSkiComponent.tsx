import React, {useEffect} from "react";
import styles from '../../createForm/createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    selectAllSkisData,
    selectNewSkiData,
    setNewSkiData,
    setSkiDataByIndex,
    updateOneSkiData
} from "../../../../redux/skisSlice";
import SkiFormComponent from "../../formContent/skiForm/SkiFormComponent";
import {validateSki} from "../../../../commonFunctions/validationFunctions/skiValidationFunctions";
import {setIsUpdateSkiUiOpen} from "../../../../redux/appStateSlice";

type PropsType = {
    index: number
}

const UpdateSkiComponent: React.FC<PropsType> = ({index}) => {
    const initialData = useAppSelector(selectAllSkisData)[index]
    const ski = useAppSelector(selectNewSkiData)


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiData(initialData))
    }, [initialData, dispatch])


    function handleUpdateClick() {
        const validationError = validateSki(ski)
        if (validationError !== '') {
            alert(validationError)
        } else {
            const actionPayloadDTO = {
                index: index,
                data: ski
            }
            dispatch(setSkiDataByIndex(actionPayloadDTO))
            dispatch(updateOneSkiData({id: ski.id, data: actionPayloadDTO.data}))
            dispatch(setIsUpdateSkiUiOpen())
        }
    }


    return (<div className={styles.createForm}>
        <SkiFormComponent ski={ski} isInitialized={true}/>
        <button onClick={handleUpdateClick} className={styles.redButton}>
            Изменить
        </button>
    </div>)
}

export default UpdateSkiComponent