import React from "react";
import styles from '../../createForm/createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    selectNewSkiPoleData,
    selectSkiPoles,
    setSkiPoleDataByIndex,
    updateOneSkiPoleData
} from "../../../../redux/skiPolesSlice";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {setIsUpdateSkiPoleUiOpen} from "../../../../redux/appStateSlice";
import SkiPoleFormComponent from "../../skiPoleForm/SkiPoleFormComponent";

type PropsType = {
    index: number
}

const UpdateSkiPoleComponent: React.FC<PropsType> = ({index}) => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const initialData = useAppSelector(selectSkiPoles)[index]
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
        <SkiPoleFormComponent initialData={initialData}/>
        <button onClick={handleUpdateClick} className={styles.editButton}>
            Изменить
        </button>
    </div>
}

export default UpdateSkiPoleComponent