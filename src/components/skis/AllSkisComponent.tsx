import React from "react";
import styles from './AllSkisComponent.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectClassicSkis, selectSkatingSkis, selectSkiStatus} from "../../redux/skisSlice";
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import {skiViewAllModel} from "../../utils/types";
import {NavLink} from "react-router-dom";
import {rotateImg90deg} from "../commonComponents/rotateImg90deg/rotateImg90deg";

const AllSkisComponent: React.FC<{ skiType: skiTypeEnum }> = ({skiType}) => {
    const status = useAppSelector(selectSkiStatus)
    const classicSkis = useAppSelector(selectClassicSkis)
    const skatingSkis = useAppSelector(selectSkatingSkis)

    function hrefSwitcher(model: skiViewAllModel) {
        return <NavLink key={model.id} to={`/${model.type.toLowerCase()}/${model.id}`} className={styles.skiModel}>
            <h2>{model.name}</h2>
            <span
                className={styles.tooltip}>{model.desc}</span>
            {
                rotateImg90deg(model.skiImg)
            }
        </NavLink>
    }

    return status === "loading" ?
        <div>Loading</div>
        : <div className={styles.wrapper}>
            <div className={styles.allSkisContainer}>
                {skiType === skiTypeEnum.CLASSIC ?
                    classicSkis.map(c => hrefSwitcher(c))
                    : skatingSkis.map(s => hrefSwitcher(s))}
            </div>
        </div>
}

export default AllSkisComponent