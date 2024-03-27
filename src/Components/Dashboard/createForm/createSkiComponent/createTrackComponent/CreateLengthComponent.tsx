import React, {useState} from "react";
import {lengthType} from "../../../../../utils/types";
import ManageWeightsComponent from "./manageWeightsComponent/ManageWeightsComponent";

type PropsType = {
    track: lengthType,
    trackIndex: number,
    trackType: 'hard' | 'universal',
    filterOutLength: (track: lengthType) => void
}

const CreateLengthComponent: React.FC<PropsType> = ({track, trackType, trackIndex, filterOutLength}) => {
    const [isCreateWeightUiOpen, setIsCreateWeightUiOpen] = useState(false)

    return <div>
        <div>
            <button onClick={() => setIsCreateWeightUiOpen(!isCreateWeightUiOpen)}>
                {track.lengthString}
            </button>
            <button onClick={() => filterOutLength(track)}>
                X
            </button>
        </div>
        {isCreateWeightUiOpen && <ManageWeightsComponent track={track} trackIndex={trackIndex} trackType={trackType}/>}
    </div>
}

export default CreateLengthComponent