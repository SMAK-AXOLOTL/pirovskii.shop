import React from "react";
import styles from './UpdateFormComponent.module.css'


const UpdateFormComponent = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.updateFormContainer}>
                <form>
                    <button type={"submit"}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateFormComponent