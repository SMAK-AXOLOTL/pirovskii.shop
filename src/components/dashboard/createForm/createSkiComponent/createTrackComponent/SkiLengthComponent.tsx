import React, {useState} from "react";
import styles from './SkiLengthComponent.module.css'
import {skiLengthType} from "../../../../../utils/types";
import ManageWeightsComponent from "./manageWeightsComponent/ManageWeightsComponent";

type PropsType = {
    track: skiLengthType,
    trackIndex: number,
    trackType: 'hard' | 'universal',
    filterOutLength: (index: number) => void
}

const SkiLengthComponent: React.FC<PropsType> = ({track, trackType, trackIndex, filterOutLength}) => {
    const [isCreateWeightUiOpen, setIsCreateWeightUiOpen] = useState(false)

    return <div className={styles.wrapper}>
        <div className={styles.buttonsContainer}>
            <button
                className={styles.lengthButton}
                onClick={() => setIsCreateWeightUiOpen(!isCreateWeightUiOpen)}>
                {track.lengthString}
            </button>
            <button
                className={styles.deleteButton}
                onClick={() => filterOutLength(trackIndex)}>
                X
            </button>
        </div>
        {isCreateWeightUiOpen && <ManageWeightsComponent track={track} trackIndex={trackIndex} trackType={trackType} uiControlCallBack={setIsCreateWeightUiOpen}/>}
    </div>
}

export default SkiLengthComponent