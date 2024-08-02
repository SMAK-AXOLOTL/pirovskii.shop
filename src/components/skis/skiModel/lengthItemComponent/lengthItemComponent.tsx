import React from "react";
import styles from './lengthItemComponent.module.css'
import {skiLengthType} from "../../../../utils/types";
import ContactButtonComponent from "../../../commonComponents/contactButton/ContactButtonComponent";

type PropsType = {
    length: skiLengthType,
    skiName: string
}

const LengthItemComponent: React.FC<PropsType> = ({length, skiName}) => {

    return <div className={styles.wrapper}>
        <div className={styles.lengthContainer}>
            <div className={styles.tableSection}>
                <h4 className={styles.tableSectionTooltip}>Рост</h4>
                <h2 style={{marginRight: '1vh'}}>{length.lengthString}</h2>
            </div>
            <div className={styles.tableSection}>
                <h4 className={styles.tableSectionTooltip}>Вес</h4>
                <div className={styles.weightsContainer}>
                    {length.weights.map((w, index) =>
                        w.isReserved ? <div key={w.weightString + index}>
                                <button id={w.weightString} disabled={true}
                                        className={styles.weightItemContainer}>{w.weightString}
                                </button>
                            </div>
                            : <ContactButtonComponent
                                key={w.weightString + index}
                                productName={skiName}
                                productLength={length.lengthString}
                                productWeight={w.weightString}
                            />
                    )}
                </div>
            </div>
        </div>
    </div>
}

export default LengthItemComponent