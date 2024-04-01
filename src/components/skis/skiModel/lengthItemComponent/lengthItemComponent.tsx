import React from "react";
import styles from './lengthItemComponent.module.css'
import {skiLengthType} from "../../../../utils/types";

type PropsType = {
    length: skiLengthType
}

const LengthItemComponent: React.FC<PropsType> = ({length}) => {

    return <div className={styles.wrapper}>
        <div className={styles.lengthContainer}>
            <h2 style={{marginRight: '1vh'}}>{length.lengthString}</h2>
            <div className={styles.weightsContainer}>
                {length.weights.map( (w, index) =>
                    w.isReserved ?
                        <button key={w.weightString + index} id={w.weightString} disabled={true} className={styles.weightItemContainer}>Бронь</button>
                        : <button key={w.weightString + index} id={w.weightString} className={styles.weightItemContainer}>{w.weightString}</button>
                )}
            </div>
        </div>
    </div>
}

export default LengthItemComponent