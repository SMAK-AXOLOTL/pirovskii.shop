import React from "react";
import styles from './SkiPoleModelComponent.module.css'
import {useParams} from "react-router-dom";
import {selectSkiPoles} from "../../../redux/skiPolesSlice";
import {useAppSelector} from "../../../hooks/reduxHooks";

const SkiPoleModelComponent = () => {
    const {modelId} = useParams()
    const skiPoles = useAppSelector(selectSkiPoles)
    const actualSkiPole = skiPoles.find((x) => x.id === modelId)

    return <div className={styles.wrapper}>
        {actualSkiPole && <div className={styles.skiPolesContainer}>
            <img src={actualSkiPole.poleImg} alt={modelId}/>
            <div className={styles.lengthTableContainer}>
                {actualSkiPole.lengthArray?.map((x) => (
                    <button className={styles.tableRow}>
                        {x}
                    </button>
                ))}
            </div>
        </div>}
    </div>
}

export default SkiPoleModelComponent