import React from "react";
import styles from './SkiModelComponent.module.css'
import {selectSkis} from "../../../redux/skisSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";
import {useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";

const SkiModelComponent = () => {
    const {modelId} = useParams()
    const skating = useAppSelector(selectSkis)
    const actualSkating = skating.find((x) => x.id === modelId)

    return <div className={styles.wrapper}>
        {actualSkating && <div className={styles.classicModelContainer}>
            <GoBackButtonComponent/>
            <div className={styles.skiInfo}>
                <img src={actualSkating.skiImg} alt={modelId}/>
                <p>Тут будет какое-то длинное описание свойств каждой модели. Оно может занимать от одной строки до
                    нескольких. Его ширина автоматически подгоняется под размер и выглядит аккуратно</p>
                <h2>Цена: 25000 руб / 300$</h2>
            </div>
            <div className={styles.sizesTableContainer}>
                {actualSkating.universalTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Универсальные
                        </h2>
                        {actualSkating.universalTrack && actualSkating.universalTrack.map((u) =>
                            <LengthItemComponent key={u.lengthString} length={u}/>
                        )
                        }
                    </div>
                }
                {actualSkating.hardTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Жесткая трасса
                        </h2>
                        {actualSkating.hardTrack && actualSkating.hardTrack.map((h) =>
                            <LengthItemComponent key={h.lengthString} length={h}/>
                        )
                        }
                    </div>
                }
            </div>
        </div>
        }
    </div>
}
export default SkiModelComponent