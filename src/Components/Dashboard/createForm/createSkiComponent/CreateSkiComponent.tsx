import React, {useEffect} from "react";
import styles from './CreateSkiComponent.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {createSki, selectNewSkiData, setNewSkiData} from "../../../../redux/skisSlice";
import {skiTypeEnum} from "../../../../utils/skiTypeEnum";
import SkiTrackComponent from "../../skiTracks/SkiTrackComponent";


const CreateSkiComponent = () => {
    const ski = useAppSelector(selectNewSkiData)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setNewSkiData({id: '', type: skiTypeEnum.CLASSIC, name: '', skiImg: '', hardTrack: [], universalTrack: []}))
    }, [dispatch]);

    function handleCreateClick() {
        dispatch(createSki(ski))
    }

    return (<div className={styles.createForm}>
        <SkiTrackComponent ski={ski} isInitialized={false}/>
        <button onClick={handleCreateClick}>
            Добавить
        </button>
    </div>)
}

export default CreateSkiComponent