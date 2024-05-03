import React, {useEffect} from "react";
import styles from './SkiPolesComponent.module.css'
import {useNavigate} from "react-router-dom";
import {selectSkiPoles} from "../../redux/skiPolesSlice";
import SkiPoleModelComponent from "./skiPoleModel/SkiPoleModelComponent";
import {useAppSelector} from "../../hooks/reduxHooks";

const SkiPolesComponent: React.FC = () => {
    const skiPolesModels = useAppSelector(selectSkiPoles)
    const navigate = useNavigate()

    useEffect(() => {
        if (skiPolesModels.length !== 0)
            navigate(`/ski-poles/${skiPolesModels[0].id}`)
    }, [navigate, skiPolesModels]);


    return <div className={styles.wrapper}>
        {skiPolesModels && <div className={styles.skatingContainer}>
            <SkiPoleModelComponent/>
        </div>}
    </div>
}

export default SkiPolesComponent