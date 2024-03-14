import React from "react";
import styles from './SkatingModelComponent.module.css'
import {useSelector} from "react-redux";
import {selectSkating} from "../skatingSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";

const SkatingModelComponent = () => {
    const {modelId} = useParams()
    const skating = useSelector(selectSkating)
    let actualSkating = skating.models[0]

    switch (modelId){
        case 'supra_x': {
            actualSkating = skating.models[0]
            break
        }
        case 'supra_c': {
            actualSkating = skating.models[1]
            break}
        case 'acadia': {
            actualSkating = skating.models[2]
            break}
    }

    return <div className={styles.wrapper}>
        <img src={actualSkating.skiImg} alt={modelId}/>
        <div className={styles.sizesTableContainer}>
            {actualSkating.hardTrack !== undefined &&
                <div className={styles.sizesTable}>
                    <h2>
                        Жесткие
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
    </div>
}

export default SkatingModelComponent