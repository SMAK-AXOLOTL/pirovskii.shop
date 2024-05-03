import React, {useState} from "react";
import styles from './ChangeWeightComponent.module.css'
import {useAppDispatch} from "../../../../../../../hooks/reduxHooks";
import {setNewSkiHardTrackWeight, setNewSkiUniTrackWeight} from "../../../../../../../redux/skisSlice";

type PropsType = {
    trackIndex: number,
    trackType: 'hard' | 'universal',
    weightIndex: number,
    weight: string,
    reservation: boolean,
    uiControlCallback: (arg: boolean) => void
}

const ChangeWeightComponent: React.FC<PropsType> = ({trackIndex, trackType, weightIndex, weight, reservation, uiControlCallback}) => {
    const dispatch = useAppDispatch()

    const [weightString, setWeightString] = useState(weight)
    const [isReserved, setIsReserved] = useState(reservation)

    function handleChangeWeightClick(index: number, weight: string, isReserved: boolean) {
        const actionPayloadDTO = {track: trackIndex, index: index, weight: weight, isReserved: isReserved}
        switch (trackType) {
            case "hard":
                dispatch(setNewSkiHardTrackWeight(actionPayloadDTO));
                break;
            case "universal":
                dispatch(setNewSkiUniTrackWeight(actionPayloadDTO));
                break;
        }
        setWeightString('')
        setIsReserved(false)
        uiControlCallback(false)
    }


    return <div className={styles.changeWeightUi}>
        <button className={styles.closeButton} onClick={() => handleChangeWeightClick(weightIndex, weightString, isReserved)}>X</button>
        <span>
            <h3>Изменить вес</h3>
        </span>
        <div>
            <p>
                Вес
                <input onChange={(e) => setWeightString(e.target.value)} value={weightString}/>
            </p>
        </div>
        <div>
            <p>
                Бронь
                <input type={"checkbox"} onChange={() => setIsReserved(!isReserved)} defaultChecked={isReserved}/>
            </p>
        </div>
    </div>
}

export default ChangeWeightComponent