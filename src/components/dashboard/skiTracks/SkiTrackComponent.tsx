import styles from "./SkiTrackComponent.module.css";
import SkiLengthComponent from "../createForm/createSkiComponent/createTrackComponent/SkiLengthComponent";
import React, {useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {skiModel} from "../../../utils/types";
import {
    addNewSkiHardTrack,
    addNewSkiUniTrack,
    setNewSkiHardTrack,
    setNewSkiId,
    setNewSkiName,
    setNewSkiType,
    setNewSkiUniTrack
} from "../../../redux/skisSlice";
import {skiTypeEnum} from "../../../utils/skiTypeEnum";
import {convertToBase64} from "../../../commonFunctions/convertToBase64";
import ImagePreviewWithFullscreen from "../../commonComponents/imagePreviewWithFullscreen/ImagePreviewWithFullscreen";

type PropsType = {
    ski: skiModel,
    isInitialized: boolean
}

const SkiTrackComponent: React.FC<PropsType> = ({ski, isInitialized}) => {
    const [newTrackLength, setNewTrackLength] = useState('')
    const [isCreateHardTrackLengthUiOpen, setIsCreateHardTrackLengthUiOpen] = useState(false)
    const [isCreateUniversalTrackLengthUiOpen, setIsCreateUniversalTrackLengthUiOpen] = useState(false)
    const dispatch = useAppDispatch()

    function handleCreateHardTrack(length: string) {
        dispatch(addNewSkiHardTrack(length))
        setNewTrackLength('')
        setIsCreateHardTrackLengthUiOpen(false)
    }

    function handleCreateUniversalTrack(length: string) {
        dispatch(addNewSkiUniTrack(length))
        setNewTrackLength('')
        setIsCreateUniversalTrackLengthUiOpen(false)
    }

    function filterOutHardTrack(index: number) {
        dispatch(setNewSkiHardTrack(ski.hardTrack.filter((_, indexInArray) => indexInArray !== index)))
    }

    function filterOutUniversalTrack(index: number) {
        dispatch(setNewSkiUniTrack(ski.universalTrack.filter((_, indexInArray) => indexInArray !== index)))
    }


    return <div>
        <div>
            <p>ID</p>
            <input value={ski.id}
                   disabled={isInitialized}
                   type={"text"}
                   onChange={(e) => dispatch(setNewSkiId(e.target.value))}
                   required={true}
            />
        </div>
        <div>Тип:
            <select value={ski.type} onChange={(e) => dispatch(setNewSkiType(e.target.value as skiTypeEnum))}>
                <option value={skiTypeEnum.CLASSIC}>Классика</option>
                <option value={skiTypeEnum.SKATING}>Коньки</option>
            </select>
        </div>
        <div>
            <p>Название модели</p>
            <input value={ski.name}
                   type={"text"}
                   onChange={(e) => dispatch(setNewSkiName(e.target.value))}
                   required={true}/>
        </div>
        <div>
            <p>Картинка</p>
            <ImagePreviewWithFullscreen src={ski.skiImg} id={ski.id}/>
            <input type={"file"}
                   onChange={e => convertToBase64(e, "ski", dispatch)}
                   required={true}
                   accept={'image/*'}
            />
        </div>
        <div>
            <p>
                Жесткая трасса
                <button onClick={() => setIsCreateHardTrackLengthUiOpen(!isCreateHardTrackLengthUiOpen)}>+</button>
            </p>
            {isCreateHardTrackLengthUiOpen && <div className={styles.createTrack}>
                <button className={styles.closeButton} onClick={() => setIsCreateHardTrackLengthUiOpen(false)}>X
                </button>
                <div>
                    <p>Добавить длину для жесткой трассы</p>
                </div>
                <div>
                    <input type={"text"} onChange={(e) => setNewTrackLength(e.target.value)}/>
                </div>
                <button onClick={() => handleCreateHardTrack(newTrackLength)}>
                    Добавить длину
                </button>
            </div>}
            <div>
                {ski.hardTrack?.map((h, index) =>
                    <SkiLengthComponent
                        key={h.lengthString + index}
                        track={h}
                        trackIndex={index}
                        trackType={'hard'}
                        filterOutLength={filterOutHardTrack}
                    />)}
            </div>
        </div>
        <div>
            <label>
                Универсальные
                <button onClick={() => setIsCreateUniversalTrackLengthUiOpen(!isCreateUniversalTrackLengthUiOpen)}>
                    +
                </button>
            </label>
            {isCreateUniversalTrackLengthUiOpen && <div className={styles.createTrack}>
                <button className={styles.closeButton} onClick={() => setIsCreateUniversalTrackLengthUiOpen(false)}>X
                </button>
                <div>
                    <p>Добавить длину для универсальных лыж</p>
                </div>
                <div>
                    <input type={"text"} onChange={(e) => setNewTrackLength(e.target.value)}/>
                </div>
                <button onClick={() => handleCreateUniversalTrack(newTrackLength)}>
                    Добавить длину
                </button>
            </div>}
            <div>
                {ski.universalTrack?.map((u, index) =>
                    <SkiLengthComponent
                        key={u.lengthString + index}
                        track={u}
                        trackIndex={index}
                        trackType={'universal'}
                        filterOutLength={filterOutUniversalTrack}
                    />
                )}
            </div>
        </div>
    </div>
}

export default SkiTrackComponent