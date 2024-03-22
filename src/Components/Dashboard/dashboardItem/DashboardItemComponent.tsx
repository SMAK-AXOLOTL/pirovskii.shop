import React from "react";
import styles from './DashboardItemComponent.module.css'
import {skiModelType} from "../../../utils/types";

type PropsType = {
    skiModel: skiModelType
}

const DashboardItemComponent: React.FC<PropsType> = ({skiModel}) => {


    return (
        <div className={styles.row}>
            <div className={styles.column}>{skiModel.id}</div>
            <div className={styles.column}>{skiModel.skiType}</div>
            <div className={styles.column}>{skiModel.name}</div>
            <div className={styles.column}>{skiModel.skiImg}</div>
            <div className={styles.column}>skiModel.hardTrack</div>
            <div className={styles.column}>skiModel.universalTrack</div>
        </div>
    );
}

export default DashboardItemComponent