import React, {useEffect} from "react";
import styles from '../../createForm/createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiPoleLength,
    selectNewSkiPoleData,
    selectSkiPoles,
    setNewSkiPoleData,
    setNewSkiPoleName,
    setSkiPoleDataByIndex,
    updateOneSkiPoleData
} from "../../../../redux/skiPolesSlice";
import SkiPoleLengthComponent from "../../createForm/createSkipoleComponent/lengthComponent/SkiPoleLengthComponent";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {convertToBase64} from "../../../../commonFunctions/convertToBase64";
import {setIsUpdateSkiPoleUiOpen} from "../../../../redux/appStateSlice";
import ImagePreviewWithFullscreen
    from "../../../commonComponents/imagePreviewWithFullscreen/ImagePreviewWithFullscreen";

type PropsType = {
    index: number
}

const UpdateSkiPoleComponent: React.FC<PropsType> = ({index}) => {
    const initialData = useAppSelector(selectSkiPoles)[index]
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiPoleData(initialData))
    }, [dispatch, initialData])

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

    function handleCreateLengthClick() {
        dispatch(addNewSkiPoleLength())
    }

    return (<div className={styles.createForm}>
        <div>
            <label>ID</label>
            <input type={"text"} disabled={true} value={skiPole.id}/>
        </div>
        <div>
            <label>Название модели</label>
            <input value={skiPole.name} type={"text"} onChange={(e) => dispatch(setNewSkiPoleName(e.target.value))}/>
        </div>
        <div>
            <label>Картинка</label>
            <ImagePreviewWithFullscreen src={skiPole.poleImg} id={skiPole.id}/>
            <input type={"file"}
                   onChange={(e) => convertToBase64(e, "skiPole", dispatch)}
                   required={true}
                   accept={'image/*'}
            />
        </div>
        <div>
            <label>
                Длина для обрезки
                <button onClick={handleCreateLengthClick}>+</button>
            </label>
            {skiPole.lengthArray.map((l, index) =>
                <SkiPoleLengthComponent key={l.lengthString + index} length={l.lengthString} isReserved={l.isReserved}
                                        index={index}/>
            )}
        </div>
        <button onClick={handleUpdateClick} className={styles.redButton}>
            Изменить
        </button>
    </div>)
}

export default UpdateSkiPoleComponent