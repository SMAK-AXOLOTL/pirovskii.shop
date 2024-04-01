import React, {useEffect} from "react";
import styles from './CreateSkiPoleComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiPoleLength,
    createSkiPole,
    selectNewSkiPoleData,
    setNewSkiPoleData,
    setNewSkiPoleId,
    setNewSkiPoleImg,
    setNewSkiPoleName
} from "../../../../redux/skiPolesSlice";
import SkiPoleLengthComponent from "./lengthComponent/SkiPoleLengthComponent";


const CreateSkiPoleComponent = () => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiPoleData({id: 'new_ski_pole', name: 'New Ski Pole', poleImg: 'SkiPoleImagePath', lengthArray: []}))
    }, [dispatch]);

    function handleCreateClick() {
        dispatch(createSkiPole(skiPole))
    }

    function handleCreateLengthClick() {
        dispatch(addNewSkiPoleLength())
    }

    return (<div className={styles.createForm}>

        <div>
            <label>ID</label>
            <input type={"text"} value={skiPole.id} onChange={(e) => dispatch(setNewSkiPoleId(e.target.value))}/>
        </div>
        <div>
            <label>Название модели</label>
            <input type={"text"} value={skiPole.name} onChange={(e) => dispatch(setNewSkiPoleName(e.target.value))}/>
        </div>
        <div>
            <label>Картинка</label>
            <input type={"text"}  value={skiPole.poleImg} onChange={(e) => dispatch(setNewSkiPoleImg(e.target.value))}/>
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
        <button onClick={handleCreateClick}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiPoleComponent