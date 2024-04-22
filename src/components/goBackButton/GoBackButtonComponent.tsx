import React from "react";
import styles from "./GoBackButtonComponent.module.css"
import {useNavigate} from "react-router-dom";

function GoBackButtonComponent() {
    const navigate = useNavigate()

    return <button className={styles.goBackButton}
                   onClick={() => navigate(-1)}>
        {"<< Назад"}
    </button>
}

export default GoBackButtonComponent