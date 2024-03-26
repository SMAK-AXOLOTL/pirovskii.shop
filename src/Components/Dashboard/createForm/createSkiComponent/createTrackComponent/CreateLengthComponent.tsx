import React, {useState} from "react";
import styles from './CreateLengthComponent.module.css'
import {lengthType} from "../../../../../utils/types";

type PropsType = {
    track: lengthType,
    skiName: string,
    trackType: string,
    filterOutLength: (track: lengthType) => void
}

export const CreateLengthComponent: React.FC<PropsType> = ({track, skiName, trackType, filterOutLength}) => {
    const [isCreateWeightUiOpen, setIsCreateWeightUiOpen] = useState(false)

    function createWeight(trackType: string) {
        switch (trackType) {
            case 'hard':
                return <h3>{skiName} Жесткая Трасса</h3>
            case 'universal':
                return <h3>{skiName} Универсальные</h3>
        }
    }

    return <div>
        <div>
            <button onClick={() => setIsCreateWeightUiOpen(!isCreateWeightUiOpen)}>
                {track.lengthString}
            </button>
            <button onClick={() => filterOutLength(track)}>
                X
            </button>
        </div>
        {isCreateWeightUiOpen && <div className={styles.manageWeightsUi}>
            {createWeight(trackType)}
            <h2>
                {track.lengthString}
                <button>+</button>
            </h2>
            <div>
                {track.weights.map(w =>
                    <div>
                        {w.weightString}
                        <button onClick={() => w.isReserved = !w.isReserved}>R</button>
                        <button>X</button>
                    </div>)}
            </div>
        </div>}
    </div>
}