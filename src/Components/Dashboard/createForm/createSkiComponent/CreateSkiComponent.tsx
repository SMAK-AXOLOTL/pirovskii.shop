import React, {useEffect, useState} from "react";
import styles from './CreateSkiComponent.module.css'
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {createSki} from "../../../../redux/skisSlice";
import {lengthType, skiModelType} from "../../../../utils/types";
import {skiTypeEnum} from "../../../../utils/skiTypeEnum";
import {CreateLengthComponent} from "./createTrackComponent/CreateLengthComponent";


const CreateSkiComponent = () => {
    const [skiId, setSkiId] = useState('')
    const [skiType, setSkiType] = useState(skiTypeEnum.CLASSIC)
    const [skiName, setSkiName] = useState('')
    const [skiImg, setSkiImg] = useState('')
    const [hardTrack, setHardTrack] = useState([{
        lengthString: '190',
        weights: [{weightString: '55-60', isReserved: false}]
    }])
    const [universalTrack, setUniversalTrack] = useState([{
        lengthString: '190',
        weights: [{weightString: '55-60', isReserved: false}]
    }])

    const [hardTrackLength, setHardTrackLength] = useState('')
    const [isCreateHardTrackLengthUiOpen, setIsCreateHardTrackLengthUiOpen] = useState(false)

    const [universalTrackLength, setUniversalTrackLength] = useState('')
    const [isCreateUniversalTrackLengthUiOpen, setIsCreateUniversalTrackLengthUiOpen] = useState(false)

    const dispatch = useAppDispatch()

    function handleCreateClick() {
        const ski: skiModelType= {
            id: skiId,
            type: skiType,
            name: skiName,
            skiImg: skiImg,
            hardTrack: hardTrack,
            universalTrack: universalTrack
        }
        dispatch(createSki(ski))
    }

    function handleCreateHardTrack(length: string) {
        const lengthDTO: lengthType = {lengthString: length, weights: []}
        hardTrack?.push(lengthDTO)
        setHardTrackLength('')
        setIsCreateHardTrackLengthUiOpen(false)
    }

    function handleCreateUniversalTrack(length: string) {
        const lengthDTO: lengthType = {lengthString: length, weights: []}
        universalTrack?.push(lengthDTO)
        setUniversalTrackLength('')
        setIsCreateUniversalTrackLengthUiOpen(false)
    }

    function filterOutHardTrack(track: lengthType) {
        setHardTrack(hardTrack.filter((x) => {
                return x.lengthString !== track.lengthString
            }
        ))
    }

    function filterOutUniversalTrack(track: lengthType) {
        setUniversalTrack(universalTrack.filter((x) => {
                return x.lengthString !== track.lengthString
            }
        ))
    }

    useEffect(() => {}, [])

    return (<div className={styles.createForm}>
        <div>
            <label>ID</label>
            <input type={"text"} onChange={(e) => setSkiId(e.target.value)}/>
        </div>
        <div>Тип:
            <select onChange={(e) => setSkiType(e.target.value as skiTypeEnum)}>
                <option value={skiTypeEnum.CLASSIC}>Классика</option>
                <option value={skiTypeEnum.SKATING}>Коньки</option>
            </select>
        </div>
        <div>
            <label>Название модели</label>
            <input type={"text"} onChange={(e) => setSkiName(e.target.value)}/>
        </div>
        <div>
            <label>Картинка</label>
            <input type={"text"} onChange={(e) => setSkiImg(e.target.value)}/>
        </div>
        <div>
            <label>Жесткая трасса</label>
            <button onClick={() => setIsCreateHardTrackLengthUiOpen(!isCreateHardTrackLengthUiOpen)}>+</button>
            {isCreateHardTrackLengthUiOpen && <div className={styles.createTrack}>
                <div>
                    <span>Добавить длину для жесткой трассы</span>
                    <button onClick={() => setIsCreateHardTrackLengthUiOpen(false)}>X</button>
                </div>
                <input type={"text"} onChange={(e) => setHardTrackLength(e.target.value)}/>
                <button onClick={() => handleCreateHardTrack(hardTrackLength)}>Добавить длину</button>
            </div>}
            <div>
                {hardTrack?.map(h =>
                    <CreateLengthComponent
                        key={h.lengthString}
                        track={h}
                        skiName={skiName}
                        trackType={'hard'}
                        filterOutLength={filterOutHardTrack}
                    />)}
            </div>
        </div>
        <div>
            <label>Универсальные</label>
            <button onClick={() => setIsCreateUniversalTrackLengthUiOpen(!isCreateUniversalTrackLengthUiOpen)}>+</button>
            {isCreateUniversalTrackLengthUiOpen && <div className={styles.createTrack}>
                <div>
                    <span>Добавить длину для универсальных лыж</span>
                    <button onClick={() => setIsCreateUniversalTrackLengthUiOpen(false)}>X</button>
                </div>
                <input type={"text"} onChange={(e) => setUniversalTrackLength(e.target.value)}/>
                <button onClick={() => handleCreateUniversalTrack(universalTrackLength)}>Добавить длину</button>
            </div>}
            <div>
                {universalTrack?.map(h =>
                    <CreateLengthComponent
                        key={h.lengthString}
                        track={h}
                        skiName={skiName}
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