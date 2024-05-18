import React, {useEffect} from "react";
import styles from './CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {createSki, selectNewSkiData, selectSkis} from "../../../../redux/skisSlice";
import SkiFormComponent from "../../skiForm/SkiFormComponent";
import {validateSki} from "../../../../commonFunctions/validationFunctions/skiValidationFunctions";
import {setCreateUiOpen} from "../../../../redux/appStateSlice";
import {clearNewSkiPoleData} from "../../../../redux/skiPolesSlice";


const CreateSkiComponent = () => {
    const ski = useAppSelector(selectNewSkiData)
    const allSkiData = useAppSelector(selectSkis)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearNewSkiPoleData())
    }, [dispatch]);

    function handleCreateClick() {
        const validationError = validateSki(ski, allSkiData)
        if (validationError !== '') {
            alert(validationError)
        } else {
            dispatch(createSki(ski))
            dispatch(setCreateUiOpen())
        }
    }

    return (<div className={styles.createForm}>
        <SkiFormComponent ski={ski} isInitialized={false}/>
        <button onClick={handleCreateClick} className={styles.redButton}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiComponent