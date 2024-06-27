import React, {useEffect} from "react";
import styles from '../createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    clearNewSkiPoleData,
    createSkiPole,
    selectNewSkiPoleData,
    selectSkiPolesData
} from "../../../../redux/skiPolesSlice";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {setCreateUiOpen} from "../../../../redux/appStateSlice";
import SkiPoleFormComponent from "../../formContent/skiPoleForm/SkiPoleFormComponent";

const CreateSkiPoleComponent = () => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const allSkiPolesData = useAppSelector(selectSkiPolesData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearNewSkiPoleData())
    }, [dispatch]);
    
    function handleCreateClick() {
        const validationError = validateSkiPole(skiPole, allSkiPolesData)
        if (validationError !== '') {
            alert(validationError)
        } else {
            dispatch(createSkiPole(skiPole))
            dispatch(setCreateUiOpen())
        }
    }

    return <div className={styles.createForm}>
        <SkiPoleFormComponent/>
        <button onClick={handleCreateClick} className={styles.redButton}>
            Добавить
        </button>
    </div>
}

export default CreateSkiPoleComponent