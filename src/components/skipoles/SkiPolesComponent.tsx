import React, {useEffect} from "react";
import styles from './SkiPolesComponent.module.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {selectSkiPoles} from "../../redux/skiPolesSlice";
import SkiPoleModelComponent from "./skiPoleModel/SkiPoleModelComponent";
import {useAppSelector} from "../../hooks/reduxHooks";


const SkiPolesComponent: React.FC = () => {
    const {modelId} = useParams()
    const skiPolesModels = useAppSelector(selectSkiPoles)
    const navigate = useNavigate()

    function activeColorSetter(modelId: string | undefined, buttonId: string) {
        return modelId === buttonId ? styles.active : styles.notActive
    }

    useEffect(() => {
        if (skiPolesModels.length !== 0)
            navigate(`/ski-poles/${skiPolesModels[0].id}`)
    }, [navigate, skiPolesModels]);


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