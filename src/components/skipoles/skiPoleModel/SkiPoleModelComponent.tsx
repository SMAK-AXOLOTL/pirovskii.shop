import React from "react";
import styles from './SkiPoleModelComponent.module.css'
import {useParams} from "react-router-dom";
import {selectSkiPoles} from "../../../redux/skiPolesSlice";
import {useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";
import ContactButtonComponent from "../../commonComponents/contactButton/ContactButtonComponent";


//toDo: set margins and wrapper position
const SkiPoleModelComponent = () => {
    const {modelId} = useParams()
    const skiPole = useAppSelector(selectSkiPoles).find((x) => x.id === modelId)

    return <div className={styles.wrapper}>
        {skiPole && <div className={styles.container}>
            <GoBackButtonComponent/>
            <div className={styles.skiPoleImgAndDescContainer}>
                <img src={skiPole.poleImg} alt={skiPole.name}/>
                <p>Описание Лыжины.Описание Лыжины.Описание Лыжины.Описание Лыжины.Описание Лыжины.Описание
                    Лыжины.Описание Лыжины.</p>
                <h2>25000 руб / 300$</h2>
            </div>
            <div className={styles.lengthTableContainer}>
                <h4>Длины под обрезку</h4>
                <div className={styles.lengthTable}>
                    {skiPole.lengthArray?.map((lengthItem, index) => (
                        lengthItem.isReserved ?
                            <button key={lengthItem.lengthString + index} disabled={true} className={styles.lengthItm}>
                                Бронь
                            </button>
                            : <ContactButtonComponent
                                key={lengthItem.lengthString + index}
                                productName={skiPole.name}
                                productLength={lengthItem.lengthString}
                            />
                    ))}
                </div>
            </div>
        </div>}
    </div>
}

export default SkiPoleModelComponent