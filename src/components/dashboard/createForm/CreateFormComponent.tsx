import React, {useState} from "react";
import styles from './CreateFormComponent.module.css'
import CreateSkiComponent from "./createSkiComponent/CreateSkiComponent";
import CreateSkiPoleComponent from "./createSkipoleComponent/CreateSkiPoleComponent";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {setCreateUiOpen} from "../../../redux/appStateSlice";
import CreateAccessoryComponent from "./createAccessoryComponent/CreateAccessoryComponent";


const CreateFormComponent = () => {
    const [createType, setCreateType] = useState('ski')
    const dispatch = useAppDispatch()
    return (
        <div className={styles.wrapper}>
            <div className={styles.createFormContainer}>
                <button className={styles.redButton} onClick={() => dispatch(setCreateUiOpen())}>x</button>
                <h1>Добавить</h1>
                <select onChange={(e) => setCreateType(e.target.value)}>
                    <option value={'ski'}>Лыжи</option>
                    <option value={'skipole'}>Палки</option>
                    <option value={'accessory'}>Аксессуар</option>
                </select>
                {createType === 'ski' && <CreateSkiComponent/>}
                {createType === 'skipole' && <CreateSkiPoleComponent/>}
                {createType === 'accessory' && <CreateAccessoryComponent/>}
            </div>
        </div>
    );
}

export default CreateFormComponent