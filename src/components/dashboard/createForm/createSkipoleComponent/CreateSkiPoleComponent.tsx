import React, {useEffect} from "react";
import styles from '../createSkiComponent/CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiPoleLength,
    createSkiPole,
    selectNewSkiPoleData,
    selectSkiPoles,
    setNewSkiPoleData,
    setNewSkiPoleId,
    setNewSkiPoleName
} from "../../../../redux/skiPolesSlice";
import SkiPoleLengthComponent from "./lengthComponent/SkiPoleLengthComponent";
import {validateSkiPole} from "../../../../commonFunctions/validationFunctions/skiPoleValidationFunctions";
import {convertToBase64} from "../../../../commonFunctions/convertToBase64";
import {setCreateUiOpen} from "../../../../redux/appStateSlice";
import ImagePreviewWithFullscreen
    from "../../../commonComponents/imagePreviewWithFullscreen/ImagePreviewWithFullscreen";


const CreateSkiPoleComponent = () => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setNewSkiPoleData({
            id: 'new_ski_pole',
            name: 'New Ski Pole',
            poleImg: '',
            lengthArray: []
        }))
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
            <ImagePreviewWithFullscreen src={skiPole.poleImg} id={skiPole.id}/>
            <input type={"file"}
                   onChange={e => convertToBase64(e,"skiPole", dispatch)}
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
        <button onClick={handleCreateClick} className={styles.redButton}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiPoleComponent