import styles from "./SkiPoleFormComponent.module.css";
import {
    addNewSkiPoleLength,
    clearNewSkiPoleData,
    selectNewSkiPoleData,
    setNewSkiPoleData,
    setNewSkiPoleDesc,
    setNewSkiPoleId,
    setNewSkiPoleName,
    setNewSkiPolePriceInRubles
} from "../../../../redux/skiPolesSlice";
import ImagePreviewWithFullscreen
    from "../../../commonComponents/imagePreviewWithFullscreen/ImagePreviewWithFullscreen";
import {convertToBase64} from "../../../../commonFunctions/convertToBase64";
import SkiPoleLengthComponent from "../../createForm/createSkipoleComponent/lengthComponent/SkiPoleLengthComponent";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {skiPoleType} from "../../../../utils/types";
import ResizableTextArea from "../../../commonComponents/resizableTextArea/ResizableTextArea";

type PropsType = {
    initialData?: skiPoleType
}

const SkiPoleFormComponent: React.FC<PropsType> = ({initialData}) => {
    const skiPole = useAppSelector(selectNewSkiPoleData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        initialData ?
            dispatch(setNewSkiPoleData(initialData))
            : dispatch(clearNewSkiPoleData())
    }, [dispatch, initialData])

    function handleCreateLengthClick() {
        dispatch(addNewSkiPoleLength())
    }

    return <div className={styles.createForm}>
        <div>
            <label>ID</label>
            <input type={"text"}
                   value={skiPole.id}
                   onChange={(e) => dispatch(setNewSkiPoleId(e.target.value))}/>
        </div>
        <div>
            <label>Название модели</label>
            <input type={"text"}
                   value={skiPole.name}
                   onChange={(e) => dispatch(setNewSkiPoleName(e.target.value))}/>
        </div>
        <div>
            <label>Описание модели</label>
            <ResizableTextArea
                value={skiPole.desc}
                inputType={"dispatch"}
                maxLength={210}
                dispatchCallback={setNewSkiPoleDesc}
            />
        </div>
        <div>
            <label>Цена модели в рублях</label>
            <input type={"number"}
                   min={0}
                   value={skiPole.priceInRubles}
                   onChange={(e) => dispatch(setNewSkiPolePriceInRubles(e.target.value))}/>
        </div>
        <div>
            <label>Картинка</label>
            {skiPole.poleImgArr.length > 0 &&
                skiPole.poleImgArr.map((_, index) =>
                    <ImagePreviewWithFullscreen key={"skiPoleImage " + index} src={skiPole.poleImgArr[index]}
                                                id={skiPole.id} index={index}/>
                )
            }
            <input type={"file"}
                   onChange={e => convertToBase64(e, "skiPole", dispatch, "add")}
                   required={true}
                   accept={'image/*'}
            />
        </div>
        <div>
            <label>
                Длина для обрезки
                <button onClick={handleCreateLengthClick} className={styles.addNewLengthButton}>
                    +
                </button>
            </label>
            {skiPole && skiPole.lengthArray.map((l, index) =>
                <SkiPoleLengthComponent key={l.lengthString + index}
                                        length={l.lengthString}
                                        isReserved={l.isReserved}
                                        index={index}/>
            )}
        </div>
    </div>
}

export default SkiPoleFormComponent