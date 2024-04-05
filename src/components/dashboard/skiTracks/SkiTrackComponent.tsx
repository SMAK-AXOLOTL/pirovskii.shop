import styles from "../updateForm/updateSkiComponent/UpdateSkiComponent.module.css";
import SkiLengthComponent from "../createForm/createSkiComponent/createTrackComponent/SkiLengthComponent";
import React, {useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {skiModel} from "../../../utils/types";
import {
    addNewSkiHardTrack,
    addNewSkiUniTrack,
    setNewSkiHardTrack,
    setNewSkiId,
    setNewSkiImg,
    setNewSkiName,
    setNewSkiType,
    setNewSkiUniTrack
} from "../../../redux/skisSlice";
import {skiTypeEnum} from "../../../utils/skiTypeEnum";

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
        dispatch(setNewSkiHardTrack(ski.hardTrack.filter((value, indexInArray) => indexInArray !== index)))
    }

    function filterOutUniversalTrack(index: number) {
        dispatch(setNewSkiUniTrack(ski.universalTrack.filter((value, indexInArray) => indexInArray !== index)))
    }

    function convertToBase64(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                dispatch(setNewSkiImg(reader.result))
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
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
            <img src={ski.skiImg} alt={ski.id}/>
            <input type={"file"}
                   onChange={convertToBase64}
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
                <div>
                    <p>Добавить длину для жесткой трассы</p>
                    <button onClick={() => setIsCreateHardTrackLengthUiOpen(false)}>X</button>
                </div>
                <input type={"text"} onChange={(e) => setNewTrackLength(e.target.value)}/>
                <button
                    onClick={() => handleCreateHardTrack(newTrackLength)}>
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
                <div>
                    <span>Добавить длину для универсальных лыж</span>
                    <button onClick={() => setIsCreateUniversalTrackLengthUiOpen(false)}>X</button>
                </div>
                <input type={"text"} onChange={(e) => setNewTrackLength(e.target.value)}/>
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