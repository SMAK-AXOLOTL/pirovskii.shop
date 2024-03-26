import React from "react";
import styles from './SkiModelComponent.module.css'
import {selectSkis} from "../../../redux/skisSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";
import {useAppSelector} from "../../../hooks/reduxHooks";

const SkiModelComponent = () => {
    const {modelId} = useParams()
    const skating = useAppSelector(selectSkis)
    const actualSkating = skating.find( (x) => x.id === modelId)

    return <div className={styles.wrapper}>
        {actualSkating && <div className={styles.classicModelContainer}>
            <img src={actualSkating.skiImg} alt={modelId}/>
            <div className={styles.sizesTableContainer}>
                {actualSkating.hardTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Жесткая трасса
                        </h2>
                        {actualSkating.hardTrack && actualSkating.hardTrack.map((h) =>
                            <LengthItemComponent key={h.lengthString} length={h}/>)}
                    </div>
                }
                {actualSkating.universalTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Универсальные
                        </h2>
                        {actualSkating.universalTrack && actualSkating.universalTrack.map((u) =>
                            <LengthItemComponent key={u.lengthString} length={u}/>)}
                    </div>
                }
            </div>
        </div>}
    </div>
}

export default SkiModelComponent