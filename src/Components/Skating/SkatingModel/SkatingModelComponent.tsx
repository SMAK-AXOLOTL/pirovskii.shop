import React from "react";
import styles from './SkatingModelComponent.module.css'
import long_skies from '../../../media/long_skies.png'

type PropsType = {
    modelId: string | undefined
}

const SkatingModelComponent: React.FC<PropsType> = ({modelId}) => {


    return <div className={styles.wrapper}>
        <img src={long_skies} alt={modelId}/>
        <div className={styles.sizesTableContainer}>
            <div className={styles.sizesTable}>
                <h2>
                    Жесткие
                </h2>
                <div>Model_sizes</div>
            </div>
            <div className={styles.sizesTable}>
                <h2>
                    Универсальные
                </h2>
                <div>Model_sizes</div>
            </div>
        </div>
    </div>
}

export default SkatingModelComponent