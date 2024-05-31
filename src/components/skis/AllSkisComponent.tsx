import React from "react";
import styles from './AllSkisComponent.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectClassicSkis, selectSkatingSkis, selectSkiStatus} from "../../redux/skisSlice";
import {skiTypeEnum} from "../../enums/skiTypeEnum";
import {skiViewAllModel} from "../../utils/types";
import {NavLink} from "react-router-dom";

const AllSkisComponent: React.FC<{ skiType: skiTypeEnum }> = ({skiType}) => {
    const status = useAppSelector(selectSkiStatus)
    const classicSkis = useAppSelector(selectClassicSkis)
    const skatingSkis = useAppSelector(selectSkatingSkis)

    function slideGenerator(model: skiViewAllModel) {
        return <div className={styles.skiModel} key={model.id}>
            <img src={model.skiImg} className={styles.skiImg} alt={model.name}/>
            <div className={styles.nameAndDescBlock}>
                <h2 className={styles.skiName}>{model.name}</h2>
                <h3 className={styles.skiDesc}>{model.desc}</h3>
            </div>
            <NavLink to={`/${model.type.toLowerCase()}/${model.id}`} className={styles.navLink}>
                <button className={styles.goToButton}>Перейти</button>
            </NavLink>
        </div>

    }

    return status === "loading" ? <div>Loading</div>
        : <div className={styles.wrapper}>
            {skiType === skiTypeEnum.CLASSIC
                ? classicSkis.map(c => slideGenerator(c))
                : skatingSkis.map(s => slideGenerator(s))}
        </div>
}

export default AllSkisComponent