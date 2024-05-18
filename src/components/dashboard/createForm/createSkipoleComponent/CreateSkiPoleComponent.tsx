import React from "react";
import styles from '../createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {createSkiPole, selectNewSkiPoleData, selectSkiPoles} from "../../../../redux/skiPolesSlice";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {setCreateUiOpen} from "../../../../redux/appStateSlice";
import SkiPoleFormComponent from "../../skiPoleForm/SkiPoleFormComponent";

const CreateSkiPoleComponent = () => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
    const dispatch = useAppDispatch()

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