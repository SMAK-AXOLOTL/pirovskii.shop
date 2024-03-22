import React, {useEffect} from "react";
import styles from './SkisComponent.module.css'
import SkiModelComponent from "./SkiModel/SkiModelComponent";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {getClassicData, getSkatingData, selectSkis, selectSkiStatus, setSkiStatus} from "../../redux/skisSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {skiTypeEnum} from "../../utils/skiTypeEnum";

type PropsType = {
    typeEnum: string
}

const SkisComponent: React.FC<PropsType> = ({typeEnum}) => {
    const {modelId} = useParams()
    const dispatch = useDispatch() as AppDispatch
    const status = useSelector(selectSkiStatus)
    const skiModels = useSelector(selectSkis)
    const location = useLocation().pathname


    useEffect( () => {
        dispatch(setSkiStatus('idle'))
    }, [location])

    useEffect(() => {
        if (status === 'idle') {
            switch (typeEnum){
                case skiTypeEnum.SKATING: {
                    dispatch(getSkatingData())
                    break
                }
                case skiTypeEnum.CLASSIC: {
                    dispatch(getClassicData())
                    break
                }
            }
        }
    }, [location, modelId, status, dispatch])

    function activeColorSetter (modelId: string | undefined, buttonId:string) {
        return modelId === buttonId? styles.active : styles.notActive
    }

    return <div className={styles.wrapper}>
        {skiModels && <div className={styles.skatingContainer}>
            <div className={styles.buttonsContainer}>
                {skiModels.map(n =>
                    <NavLink key={n.id} to={'/' + typeEnum + '/' + n.id}>
                        <button className={activeColorSetter(modelId, n.id)} id={n.id}>{n.name}</button>
                    </NavLink>
                )}
            </div>
            <SkiModelComponent/>
        </div>}
    </div>
}

export default SkisComponent