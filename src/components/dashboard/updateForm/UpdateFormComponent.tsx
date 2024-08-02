import React from "react";
import styles from './UpdateFormComponent.module.css'
import UpdateSkiComponent from "./updateSkiComponent/UpdateSkiComponent";
import UpdateSkiPoleComponent from "./updateSkipoleComponent/UpdateSkiPoleComponent";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {closeUpdateUi} from "../../../redux/appStateSlice";
import UpdateAccessoryComponent from "./updateAccessoryComponent/UpdateAccessoryComponent";

type PropsType = {
    index: number,
    updateType: "ski" | "skiPole" | "accessory"
}

const UpdateFormComponent: React.FC<PropsType> = ({index, updateType}) => {
    const dispatch = useAppDispatch()

    function switcher(updateData: typeof updateType) {
        switch (updateData) {
            case "ski":
                return <UpdateSkiComponent index={index}/>
            case "skiPole":
                return <UpdateSkiPoleComponent index={index}/>
            case "accessory":
                return <UpdateAccessoryComponent index={index}/>
        }
    }

    return (<div className={styles.wrapper} onClick={(e) => {
            dispatch(closeUpdateUi())
        }
        }>
            <div className={styles.createFormContainer} onClick={e => e.stopPropagation()}>
                <h1>Изменить</h1>
                {switcher(updateType)}
            </div>
        </div>
    );
}

export default UpdateFormComponent