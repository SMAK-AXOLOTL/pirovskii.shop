import React from "react";
import styles from './UpdateFormComponent.module.css'
import UpdateSkiComponent from "./updateSkiComponent/UpdateSkiComponent";
import UpdateSkiPoleComponent from "./updateSkipoleComponent/UpdateSkiPoleComponent";

type PropsType = {
    index: number,
    updateType: "ski" | "skiPole"
}

const UpdateFormComponent:React.FC<PropsType> = ({index, updateType}) => {

    function switcher(updateData: typeof updateType) {
        switch (updateData) {
            case "ski": return <UpdateSkiComponent index={index}/>
            case "skiPole": return <UpdateSkiPoleComponent index={index}/>
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.createFormContainer}>
                <h1>Изменить</h1>
                {switcher(updateType)}
            </div>
        </div>
    );
}

export default UpdateFormComponent