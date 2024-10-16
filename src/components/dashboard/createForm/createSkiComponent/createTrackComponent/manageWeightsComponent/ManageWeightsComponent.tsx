import React, {useState} from "react";
import styles from './ManageWeightsComponent.module.css'
import {skiLengthType, skiWeightType} from "../../../../../../utils/types";
import {useAppDispatch, useAppSelector} from "../../../../../../hooks/reduxHooks";
import {
    addNewSkiHardTrackWeight,
    addNewSkiUniTrackWeight,
    deleteNewSkiHardTrackWeight,
    deleteNewSkiUniTrackWeight,
    selectNewSkiData,
    setNewSkiHardTrackWeight,
    setNewSkiUniTrackWeight
} from "../../../../../../redux/skisSlice";

type PropsType = {
    track: skiLengthType,
    trackIndex: number,
    trackType: 'hard' | 'universal',
    uiControlCallBack: React.Dispatch<React.SetStateAction<boolean>>
}

const ManageWeightsComponent: React.FC<PropsType> = ({track, trackIndex, trackType, uiControlCallBack}) => {
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

    function handleUpdateWeightClick(index: number, weightString: string, isReserved: boolean) {
        const actionPayloadDTO = {
            track: trackIndex,
            index: index,
            weight: weightString,
            isReserved: isReserved
        }
        switch (trackType) {
            case "hard":
                dispatch(setNewSkiHardTrackWeight(actionPayloadDTO));
                break;
            case "universal":
                dispatch(setNewSkiUniTrackWeight(actionPayloadDTO));
                break;
        }
    }


    const WeightComponent: React.FC<{ weight: skiWeightType, index: number }> = ({weight, index}) => {
        const [isEditWeightUiHidden, setEditWeightUiHidden] = useState(true)
        const [inputValueAccumulator, setInputValueAccumulator] = useState(weight.weightString)
        const [checkboxValueAccumulator] = useState(weight.isReserved)

        function onBlurHandler() {
            handleUpdateWeightClick(index, inputValueAccumulator, checkboxValueAccumulator)
            setEditWeightUiHidden(!isEditWeightUiHidden)
        }

        return <div className={styles.weightComponent}>
            <button hidden={!isEditWeightUiHidden}
                    onClick={() => setEditWeightUiHidden(!isEditWeightUiHidden)}>
                {weight.weightString}
            </button>
            <input
                hidden={isEditWeightUiHidden}
                value={inputValueAccumulator}
                onChange={(e) => setInputValueAccumulator(e.target.value)}
                onClick={event => event.stopPropagation()}
            />
            <div
                className={styles.weightInputWrapper}
                hidden={isEditWeightUiHidden}
                onClick={onBlurHandler}
            />
            <input
                type={"checkbox"}
                onChange={(e) => {
                    handleUpdateWeightClick(index, inputValueAccumulator, e.target.checked)
                }}
                defaultChecked={checkboxValueAccumulator}/>
            <button onClick={() => handleDeleteWeightClick(index)}>X</button>
        </div>
    }

    return <div className={styles.manageWeightsUi}>
        <button className={styles.closeButton} onClick={() => uiControlCallBack(false)}>X</button>
        {createWeight(trackType)}
        <h2>
            {track.lengthString}
            <button onClick={() => handleCreateWeightClick()}>+</button>
        </h2>
        <div className={styles.weightsWrapper}>
            {track.weights.map((w, index) =>
                <WeightComponent key={index} weight={w} index={index}/>
            )}
        </div>
    </div>
}

export default ManageWeightsComponent