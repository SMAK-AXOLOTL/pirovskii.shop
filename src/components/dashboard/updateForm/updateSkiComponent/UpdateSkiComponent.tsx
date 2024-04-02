import React, {useEffect} from "react";
import styles from './UpdateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    selectNewSkiData,
    selectSkis,
    setNewSkiData,
    setSkiDataByIndex,
    updateOneSkiData
} from "../../../../redux/skisSlice";
import SkiTrackComponent from "../../skiTracks/SkiTrackComponent";
import {validateSki} from "../../../../validationFunctions/skiValidationFunctions";

type PropsType = {
    index: number
}

const UpdateSkiComponent: React.FC<PropsType> = ({index}) => {
    const initialData = useAppSelector(selectSkis)[index]
    const ski = useAppSelector(selectNewSkiData)


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiData(initialData))
    }, [initialData, dispatch])


    function handleUpdateClick() {
        const validationError = validateSki(ski)
        if(validationError !== ''){
            alert(validationError)
        } else {
            const actionPayloadDTO = {
                index: index,
                data: ski
            }
            dispatch(setSkiDataByIndex(actionPayloadDTO))
            dispatch(updateOneSkiData({id: ski.id, data: actionPayloadDTO.data}))
        }
    }


    return (<div className={styles.createForm}>
        <SkiTrackComponent ski={ski} isInitialized={true}/>
        <button onClick={handleUpdateClick}>
            Изменить
        </button>
    </div>)
}

export default UpdateSkiComponent