import React, {useEffect, useState} from "react";
import styles from './UpdateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {
    addNewSkiHardTrack,
    addNewSkiUniTrack,
    selectNewSkiData,
    selectSkis,
    setNewSkiData,
    setNewSkiHardTrack,
    setNewSkiImg,
    setNewSkiName,
    setNewSkiType,
    setNewSkiUniTrack,
    setSkiDataByIndex,
    updateOneSkiData
} from "../../../../redux/skisSlice";
import {skiLengthType} from "../../../../utils/types";
import {skiTypeEnum} from "../../../../utils/skiTypeEnum";
import CreateLengthComponent from "../../createForm/createSkiComponent/createTrackComponent/CreateLengthComponent";

type PropsType = {
    index: number
}
//fixme rework duplicated code
const UpdateSkiComponent: React.FC<PropsType> = ({index}) => {
    const initialData = useAppSelector(selectSkis)[index]
    const ski = useAppSelector(selectNewSkiData)
    const [newTrackLength, setNewTrackLength] = useState('')
    const [isCreateHardTrackLengthUiOpen, setIsCreateHardTrackLengthUiOpen] = useState(false)
    const [isCreateUniversalTrackLengthUiOpen, setIsCreateUniversalTrackLengthUiOpen] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiData(initialData))
    }, [initialData, dispatch])

    function handleUpdateClick() {
        const actionPayloadDTO = {
            index: index,
            data: ski
        }
        dispatch(setSkiDataByIndex(actionPayloadDTO))
        dispatch(updateOneSkiData({id: ski.id, data: actionPayloadDTO.data}))
    }

    function handleCreateHardTrack(length: string) {
        const lengthDTO: skiLengthType = {lengthString: length, weights: []}
        dispatch(addNewSkiHardTrack(lengthDTO))
        setNewTrackLength('')
        setIsCreateHardTrackLengthUiOpen(false)
    }

    function handleCreateUniversalTrack(length: string) {
        const lengthDTO: skiLengthType = {lengthString: length, weights: []}
        dispatch(addNewSkiUniTrack(lengthDTO))
        setNewTrackLength('')
        setIsCreateUniversalTrackLengthUiOpen(false)
    }

    function filterOutHardTrack(track: skiLengthType) {
        dispatch(setNewSkiHardTrack(
                ski.hardTrack?.filter((x) => {
                        return x.lengthString !== track.lengthString
                    }
                )
            )
        )
    }

    function filterOutUniversalTrack(track: skiLengthType) {
        dispatch(setNewSkiUniTrack(
            ski.universalTrack?.filter((x) => {
                        return x.lengthString !== track.lengthString
                    }
                )
            )
        )
    }

    return (<div className={styles.createForm}>
        <div>
            <p>ID</p>
            <input value={ski.id} disabled={true} type={"text"}/>
        </div>
        <div>Тип:
            <select value={ski.type} onChange={(e) => dispatch(setNewSkiType(e.target.value as skiTypeEnum))}>
                <option value={skiTypeEnum.CLASSIC}>Классика</option>
                <option value={skiTypeEnum.SKATING}>Коньки</option>
            </select>
        </div>
        <div>
            <p>Название модели</p>
            <input value={ski.name} type={"text"} onChange={(e) => dispatch(setNewSkiName(e.target.value))}/>
        </div>
        <div>
            <p>Картинка</p>
            <input type={"text"} value={ski.skiImg} onChange={(e) => dispatch(setNewSkiImg(e.target.value))}/>
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
        <button onClick={handleUpdateClick}>
            Изменить
        </button>
    </div>)
}

export default UpdateSkiComponent