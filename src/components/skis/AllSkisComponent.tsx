import React from "react";
import styles from './AllSkisComponent.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectClassicSkis, selectSkatingSkis, selectSkiStatus} from "../../redux/skisSlice";
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import {skiModel} from "../../utils/types";
import {NavLink} from "react-router-dom";
import {rotateImg90deg} from "../../commonFunctions/rotateImg90deg";

//fixMe: layout for different number of objects
const AllSkisComponent: React.FC<{ skiType: skiTypeEnum }> = ({skiType}) => {
    const status = useAppSelector(selectSkiStatus)
    const classicSkis = useAppSelector(selectClassicSkis)
    const skatingSkis = useAppSelector(selectSkatingSkis)

    function hrefSwitcher(model: skiModel) {
        return <NavLink key={model.id} to={`/${model.type.toLowerCase()}/${model.id}`} className={styles.skiModel}>
            <h2>{model.name}</h2>
            <span
                className={styles.tooltip}>{`Это текст описания каждой модели. Конкретно здесь описывается ${model.name}. Возможно, сюда получится уместить даже 3 предложения описания. А вот 4 - вряд ли`}</span>
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