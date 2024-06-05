import React, {useState} from "react";
import styles from './lengthItemComponent.module.css'
import {skiLengthType} from "../../../../utils/types";
import ContactForm from "../../../commonComponents/contactForm/ContactForm";

type PropsType = {
    length: skiLengthType,
    skiName: string
}

const LengthItemComponent: React.FC<PropsType> = ({length, skiName}) => {

    const ContactButton: React.FC<{ weightString: string, index: number }> = ({weightString, index}) => {
        const [isOpen, setOpen] = useState(false)

        return <div>
            <button key={weightString + index}
                    id={weightString}
                    className={styles.weightItemContainer}
                    onClick={() => setOpen(!isOpen)}
            >
                {weightString}
            </button>
            {isOpen && <ContactForm productName={skiName} productLength={length.lengthString}
                                    productSize={weightString} callBackFunc={setOpen}/>}
        </div>
    }


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
                        w.isReserved ? <div>
                                <button key={w.weightString + index} id={w.weightString} disabled={true}
                                        className={styles.weightItemContainer}>Бронь
                                </button>
                            </div>
                            : <ContactButton key={w.weightString + index} weightString={w.weightString} index={index}/>
                    )}
                </div>
            </div>
        </div>
    </div>
}

export default LengthItemComponent