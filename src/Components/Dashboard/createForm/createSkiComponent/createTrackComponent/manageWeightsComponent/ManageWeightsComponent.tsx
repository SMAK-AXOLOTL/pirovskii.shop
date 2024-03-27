import React, {useState} from "react";
import styles from './ManageWeightsComponent.module.css'
import {lengthType, weightType} from "../../../../../../utils/types";
import {useAppDispatch, useAppSelector} from "../../../../../../hooks/reduxHooks";
import {
    addNewSkiHardTrackWeight,
    addNewSkiUniTrackWeight,
    deleteNewSkiHardTrackWeight,
    deleteNewSkiUniTrackWeight,
    selectNewSkiData
} from "../../../../../../redux/skisSlice";
import ChangeWeightComponent from "./changeWeightComponent/ChangeWeightComponent";

type PropsType = {
    track: lengthType,
    trackIndex: number,
    trackType: 'hard' | 'universal'
}

const ManageWeightsComponent: React.FC<PropsType> = ({track, trackIndex, trackType}) => {
    const skiName = useAppSelector(selectNewSkiData).name
    const dispatch = useAppDispatch()

    function createWeight(trackType: string) {
        switch (trackType) {
            case 'hard':
                return <h3>{skiName} Жесткая Трасса</h3>
            case 'universal':
                return <h3>{skiName} Универсальные</h3>
        }
    }

    function handleCreateWeightClick() {
        switch (trackType) {
            case "hard":
                dispatch(addNewSkiHardTrackWeight(track.lengthString));
                break;
            case "universal":
                dispatch(addNewSkiUniTrackWeight(track.lengthString));
                break;
        }
    }

    function handleDeleteWeightClick(index: number) {
        const actionPayloadDTO = {track: trackIndex, index: index}
        switch (trackType) {
            case "hard":
                dispatch(deleteNewSkiHardTrackWeight(actionPayloadDTO));
                break;
            case "universal":
                dispatch(deleteNewSkiUniTrackWeight(actionPayloadDTO));
                break;
        }
    }

    function reservationChecker(isReserved: boolean) {
        if (!isReserved) {
            return '!R'
        }
        return 'R'
    }

    const WeightComponent:React.FC<{w: weightType, index: number}> = ({w, index}) => {
        const [isChangeWeightStringUiOpen, setIsChangeWeightStringUiOpen] = useState(false)

        return <div>
            <button onClick={() => setIsChangeWeightStringUiOpen(!isChangeWeightStringUiOpen)}>
                {w.weightString + reservationChecker(w.isReserved)}
            </button>
            {isChangeWeightStringUiOpen &&
                <ChangeWeightComponent
                    trackIndex={trackIndex}
                    trackType={trackType}
                    weightIndex={index}
                    weight={w.weightString}
                    reservation={w.isReserved}
                    uiControlCallback={setIsChangeWeightStringUiOpen}
                />
            }
            <button onClick={() => handleDeleteWeightClick(index)}>X</button>
        </div>
    }

    return <div className={styles.manageWeightsUi}>
        {createWeight(trackType)}
        <h2>
            {track.lengthString}
            <button onClick={() => handleCreateWeightClick()}>+</button>
        </h2>
        <div>
            {track.weights.map((w, index) =>
                <WeightComponent key={index} w={w} index={index}/>
            )}
        </div>
    </div>
}

export default ManageWeightsComponent