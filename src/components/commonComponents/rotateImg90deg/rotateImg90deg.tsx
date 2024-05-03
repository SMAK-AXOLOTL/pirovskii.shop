import React from "react";
import styles from "./rotateImg90deg.module.css"

export function rotateImg90deg(base64string: string) {
    return <img src={base64string} className={styles.rotatedImage} alt={'rotated ski'}/>
}