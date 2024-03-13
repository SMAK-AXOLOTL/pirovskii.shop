import React from "react";
import styles from './SkatingComponent.module.css'
import SkatingModelComponent from "./SkatingModel/SkatingModelComponent";
import {NavLink, useParams} from "react-router-dom";


const SkatingComponent = () => {
    const {modelId} = useParams()

    return <div className={styles.wrapper}>
        <div className={styles.buttonsContainer}>
            <NavLink to={'/skating/supra_x'}>
                <button>Supra X</button>
            </NavLink>
            <NavLink to={'/skating/supra_c'}>
                <button>Supra C</button>
            </NavLink>
            <NavLink to={'/skating/acadia'}>
                <button>Acadia</button>
            </NavLink>
        </div>
        <SkatingModelComponent modelId={modelId}/>
    </div>
}

export default SkatingComponent