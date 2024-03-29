import React, {useEffect} from "react";
import styles from './UpdateSkiPoleComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiPoleLength,
    selectNewSkiPoleData,
    selectSkiPoles,
    setNewSkiPoleData,
    setNewSkiPoleImg,
    setNewSkiPoleName,
    setSkiPoleDataByIndex,
    updateOneSkiPoleData
} from "../../../../redux/skiPolesSlice";
import LengthComponent from "../../createForm/createSkipoleComponent/lengthComponent/LengthComponent";

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
        const actionPayloadDTO = {index: index, data: skiPole}
        dispatch(setSkiPoleDataByIndex(actionPayloadDTO))
        dispatch(updateOneSkiPoleData({
                id: skiPole.id,
                data: actionPayloadDTO.data
            }
        ))
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
            <input value={skiPole.poleImg} type={"text"} onChange={(e) => dispatch(setNewSkiPoleImg(e.target.value))}/>
        </div>
        <div>
            <label>
                Длина для обрезки
                <button onClick={handleCreateLengthClick}>+</button>
            </label>
            {skiPole.lengthArray.map((l, index) =>
                <LengthComponent key={l.lengthString + index} length={l.lengthString} isReserved={l.isReserved}
                                 index={index}/>
            )}
        </div>
        <button onClick={handleUpdateClick}>
            Изменить
        </button>
    </div>)
}

export default UpdateSkiPoleComponent