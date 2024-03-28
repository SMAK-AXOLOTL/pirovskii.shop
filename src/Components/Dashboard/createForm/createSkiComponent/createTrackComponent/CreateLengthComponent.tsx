import React, {useState} from "react";
import {skiLengthType} from "../../../../../utils/types";
import ManageWeightsComponent from "./manageWeightsComponent/ManageWeightsComponent";

type PropsType = {
    track: skiLengthType,
    trackIndex: number,
    trackType: 'hard' | 'universal',
    filterOutLength: (track: skiLengthType) => void
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