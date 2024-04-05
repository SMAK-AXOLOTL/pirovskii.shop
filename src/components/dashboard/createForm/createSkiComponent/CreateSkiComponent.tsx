import React, {useEffect} from "react";
import styles from './CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {createSki, selectNewSkiData, selectSkis, setNewSkiData} from "../../../../redux/skisSlice";
import {skiTypeEnum} from "../../../../utils/skiTypeEnum";
import SkiTrackComponent from "../../skiTracks/SkiTrackComponent";
import {validateSki} from "../../../../validationFunctions/skiValidationFunctions";


const CreateSkiComponent = () => {
    const ski = useAppSelector(selectNewSkiData)
    const allSkiData = useAppSelector(selectSkis)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiData({
            id: 'new_ski_id',
            name: "New Ski Name",
            type: skiTypeEnum.CLASSIC,
            skiImg: '',
            hardTrack: [],
            universalTrack: []
        }))
    }, [dispatch]);

    function handleCreateClick() {
        const validationError = validateSki(ski, allSkiData)
        if (validationError !== '') {
            alert(validationError)
        } else {
            dispatch(createSki(ski))
        }
    }

    return (<div className={styles.createForm}>
        <SkiTrackComponent ski={ski} isInitialized={false}/>
        <button onClick={handleCreateClick}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiComponent