import React from "react";
import styles from './SkatingComponent.module.css'
import SkatingModelComponent from "./SkatingModel/SkatingModelComponent";
import {NavLink, useParams} from "react-router-dom";

const SkatingComponent = () => {
    const {modelId} = useParams()

    function activeColorSetter (modelId: string | undefined, buttonId:string) {
        return modelId === buttonId? styles.active : styles.notActive
    }

    return <div className={styles.wrapper}>
        <div className={styles.skatingContainer}>
            <div className={styles.buttonsContainer}>
                <NavLink to={'/skating/supra_x'}>
                    <button className={activeColorSetter(modelId, 'supra_x')} id={'supra_x'}>Supra X</button>
                </NavLink>
                <NavLink to={'/skating/supra_c'}>
                    <button className={activeColorSetter(modelId, 'supra_c')} id={'supra_c'}>Supra C</button>
                </NavLink>
                <NavLink to={'/skating/acadia'}>
                    <button className={activeColorSetter(modelId, 'acadia')} id={'acadia'}>Acadia</button>
                </NavLink>
            </div>
            <SkatingModelComponent/>
        </div>
    </div>
}

export default SkatingComponent