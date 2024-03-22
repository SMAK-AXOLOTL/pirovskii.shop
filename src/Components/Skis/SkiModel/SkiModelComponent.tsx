import React from "react";
import styles from './SkiModelComponent.module.css'
import {useSelector} from "react-redux";
import {selectSkis} from "../../../redux/skisSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";

const SkiModelComponent = () => {
    const {modelId} = useParams()
    const skating = useSelector(selectSkis)
    let actualSkating = null

    switch (modelId){
        case 'supra_x': {
            if (skating)
            actualSkating = skating[0]
            break
        }
        case 'supra_c': {
            if (skating)
            actualSkating = skating[1]
            break
        }
        case 'acadia': {
            if (skating)
            actualSkating = skating[2]
            break
        }
    }

    return <div className={styles.wrapper}>
        {actualSkating && <div className={styles.classicModelContainer}>
            <img src={actualSkating.skiImg} alt={modelId}/>
            <div className={styles.sizesTableContainer}>
                {actualSkating.hardTrack !== undefined &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Жесткая трасса
                        </h2>
                        {actualSkating.hardTrack.map((h) =>
                            <LengthItemComponent key={h.lengthString} length={h}/>)}
                    </div>
                }
                {actualSkating.universalTrack !== undefined &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Универсальные
                        </h2>
                        {actualSkating.universalTrack.map((u) =>
                            <LengthItemComponent key={u.lengthString} length={u}/>)}
                    </div>
                }
            </div>
        </div>}
    </div>
}

export default SkiModelComponent