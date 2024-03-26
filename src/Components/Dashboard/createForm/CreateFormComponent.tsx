import React, {useState} from "react";
import styles from './CreateFormComponent.module.css'
import CreateSkiComponent from "./createSkiComponent/CreateSkiComponent";


const CreateFormComponent = () => {
    const [createType, setCreateType] = useState('ski')

    return (
        <div className={styles.wrapper}>
            <div className={styles.createFormContainer}>
                <h1>Добавить</h1>
                <select onChange={(e) => setCreateType(e.target.value)}>
                    <option value={'ski'}>Лыжи</option>
                    <option value={'skipole'}>Палки</option>
                </select>
                {createType === 'ski' && <CreateSkiComponent/>}
                {createType === 'skipole' && <div>Тут будут палки</div>}
            </div>
        </div>
    );
}

export default CreateFormComponent