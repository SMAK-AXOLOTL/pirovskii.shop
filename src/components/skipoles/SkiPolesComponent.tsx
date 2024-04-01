import React, {useEffect} from "react";
import styles from './SkiPolesComponent.module.css'
import {NavLink, useLocation, useParams} from "react-router-dom";
import {getAllSkiPolesData, selectSkiPoles, selectSkiPolesStatus, setSkiPolesStatus} from "../../redux/skiPolesSlice";
import SkiPoleModelComponent from "./skiPoleModel/SkiPoleModelComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";


const SkiPolesComponent: React.FC = () => {
    const {modelId} = useParams()
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectSkiPolesStatus)
    const skiPolesModels = useAppSelector(selectSkiPoles)
    const location = useLocation().pathname


    useEffect(() => {
        dispatch(setSkiPolesStatus('idle'))
    }, [location, dispatch])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllSkiPolesData())
        }
    }, [location, modelId, status, dispatch])

    function activeColorSetter(modelId: string | undefined, buttonId: string) {
        return modelId === buttonId ? styles.active : styles.notActive
    }

    return <div className={styles.wrapper}>
        {skiPolesModels && <div className={styles.skatingContainer}>
            <div className={styles.buttonsContainer}>
                {skiPolesModels.map(n =>
                    <NavLink key={n.id} to={'/ski-poles/' + n.id}>
                        <button className={activeColorSetter(modelId, n.id)} id={n.id}>{n.name}</button>
                    </NavLink>
                )}
            </div>
            <SkiPoleModelComponent/>
        </div>}
    </div>
}

export default SkiPolesComponent