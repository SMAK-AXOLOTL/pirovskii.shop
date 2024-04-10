import React, {useEffect} from "react";
import styles from './AllSkisComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {getAllSkisData, selectClassicSkis, selectSkatingSkis, selectSkiStatus} from "../../redux/skisSlice";
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import {skiModel} from "../../utils/types";
import {NavLink} from "react-router-dom";

const AllSkisComponent: React.FC<{ skiType: skiTypeEnum }> = ({skiType}) => {
    const dispatch = useAppDispatch()

    const status = useAppSelector(selectSkiStatus)
    const classicSkiModels = useAppSelector(selectClassicSkis)
    const skatingSkiModels = useAppSelector(selectSkatingSkis)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllSkisData())
        }
    }, [dispatch, status])


    function rotateImg90deg(base64string: string) {
        return <img src={base64string} style={{transform: "rotate(90deg)"}} alt={'rotated ski'}/>
    }

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

    return <div className={styles.wrapper}>
        <div className={styles.allSkisContainer}>
            {skiType === skiTypeEnum.CLASSIC ?
                classicSkiModels.map(c => hrefSwitcher(c))
                : skatingSkiModels.map(s => hrefSwitcher(s))}
        </div>
    </div>
}

export default AllSkisComponent