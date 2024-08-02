import React from "react";
import styles from '../../createForm/createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    selectNewSkiPoleData,
    selectSkiPolesData,
    setSkiPoleDataByIndex,
    updateOneSkiPoleData
} from "../../../../redux/skiPolesSlice";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {setIsUpdateSkiPoleUiOpen} from "../../../../redux/appStateSlice";
import SkiPoleFormComponent from "../../formContent/skiPoleForm/SkiPoleFormComponent";

type PropsType = {
    index: number
}

const UpdateSkiPoleComponent: React.FC<PropsType> = ({index}) => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const initialData = useAppSelector(selectSkiPolesData)[index]
    const dispatch = useAppDispatch()

    function handleUpdateClick() {
        const validationError = validateSkiPole(skiPole)
        if (validationError !== '') {
            alert(validationError)
        } else {
            const actionPayloadDTO = {index: index, data: skiPole}
            dispatch(setSkiPoleDataByIndex(actionPayloadDTO))
            dispatch(updateOneSkiPoleData({
                    id: skiPole.id,
                    data: actionPayloadDTO.data
                }
            ))
            dispatch(setIsUpdateSkiPoleUiOpen())
        }
    }

    return <div className={styles.createForm}>
        <SkiPoleFormComponent initialData={initialData} isInitialized={true}/>
        <button onClick={handleUpdateClick} className={styles.redButton}>
            Изменить
        </button>
    </div>
}

export default UpdateSkiPoleComponent