import React, {useEffect, useState} from "react";
import styles from './CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiHardTrack,
    addNewSkiUniTrack,
    createSki,
    selectNewSkiData,
    setNewSkiHardTrack,
    setNewSkiId,
    setNewSkiImg,
    setNewSkiName,
    setNewSkiType,
    setNewSkiUniTrack
} from "../../../../redux/skisSlice";
import {lengthType} from "../../../../utils/types";
import {skiTypeEnum} from "../../../../utils/skiTypeEnum";
import CreateLengthComponent from "./createTrackComponent/CreateLengthComponent";


const CreateSkiComponent = () => {
    const ski = useAppSelector(selectNewSkiData)

    const [newTrackLength, setNewTrackLength] = useState('')
    const [isCreateHardTrackLengthUiOpen, setIsCreateHardTrackLengthUiOpen] = useState(false)
    const [isCreateUniversalTrackLengthUiOpen, setIsCreateUniversalTrackLengthUiOpen] = useState(false)

    const dispatch = useAppDispatch()

    function handleCreateClick() {
        dispatch(createSki(ski))
    }

    function handleCreateHardTrack(length: string) {
        const lengthDTO: lengthType = {lengthString: length, weights: []}
        dispatch(addNewSkiHardTrack(lengthDTO))
        setNewTrackLength('')
        setIsCreateHardTrackLengthUiOpen(false)
    }

    function handleCreateUniversalTrack(length: string) {
        const lengthDTO: lengthType = {lengthString: length, weights: []}
        dispatch(addNewSkiUniTrack(lengthDTO))
        setNewTrackLength('')
        setIsCreateUniversalTrackLengthUiOpen(false)
    }

    function filterOutHardTrack(track: lengthType) {
        dispatch(setNewSkiHardTrack(
            ski.hardTrack?.filter((x) => {
                    return x.lengthString !== track.lengthString
                }
            )
        ))
    }

    function filterOutUniversalTrack(track: lengthType) {
        dispatch(setNewSkiUniTrack(
            ski.universalTrack?.filter((x) => {
                    return x.lengthString !== track.lengthString
                }
            )
        ))
    }

    useEffect(() => {
    }, [])

    return (<div className={styles.createForm}>
        <div>
            <label>ID</label>
            <input type={"text"} onChange={(e) => dispatch(setNewSkiId(e.target.value))}/>
        </div>
        <div>Тип:
            <select onChange={(e) => dispatch(setNewSkiType(e.target.value as skiTypeEnum))}>
                <option value={skiTypeEnum.CLASSIC}>Классика</option>
                <option value={skiTypeEnum.SKATING}>Коньки</option>
            </select>
        </div>
        <div>
            <label>Название модели</label>
            <input type={"text"} onChange={(e) => dispatch(setNewSkiName(e.target.value))}/>
        </div>
        <div>
            <label>Картинка</label>
            <input type={"text"} onChange={(e) => dispatch(setNewSkiImg(e.target.value))}/>
        </div>
        <div>
            <label>
                Жесткая трасса
                <button onClick={() => setIsCreateHardTrackLengthUiOpen(!isCreateHardTrackLengthUiOpen)}>+</button>
            </label>
            {isCreateHardTrackLengthUiOpen && <div className={styles.createTrack}>
                <div>
                    <span>Добавить длину для жесткой трассы</span>
                    <button onClick={() => setIsCreateHardTrackLengthUiOpen(false)}>X</button>
                </div>
                <input type={"text"} onChange={(e) => setNewTrackLength(e.target.value)}/>
                <button onClick={() => handleCreateHardTrack(newTrackLength)}>Добавить длину</button>
            </div>}
            <div>
                {ski.hardTrack?.map((h, index) =>
                    <CreateLengthComponent
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
                <button onClick={() => handleCreateUniversalTrack(newTrackLength)}>Добавить длину</button>
            </div>}
            <div>
                {ski.universalTrack?.map((u, index) =>
                    <CreateLengthComponent
                        key={u.lengthString + index}
                        track={u}
                        trackIndex={index}
                        trackType={'universal'}
                        filterOutLength={filterOutUniversalTrack}
                    />)}
            </div>
        </div>
        <button onClick={handleCreateClick}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiComponent