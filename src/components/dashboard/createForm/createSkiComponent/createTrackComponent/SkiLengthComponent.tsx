import React, {useState} from "react";
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

    return <div>
        <div>
            <button onClick={() => setIsCreateWeightUiOpen(!isCreateWeightUiOpen)}>
                {track.lengthString}
            </button>
            <button onClick={() => filterOutLength(trackIndex)}>
                X
            </button>
        </div>
        {isCreateWeightUiOpen && <ManageWeightsComponent track={track} trackIndex={trackIndex} trackType={trackType} uiControlCallBack={setIsCreateWeightUiOpen}/>}
    </div>
}

export default SkiLengthComponent