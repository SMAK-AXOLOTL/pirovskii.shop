import React, {useEffect} from "react";
import styles from './SkiModelComponent.module.css'
import {getSkiById, selectSkiModel} from "../../../redux/skisSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";


//fixMe: ui not showing skiModel info
const SkiModelComponent = () => {
    const {modelId} = useParams()
    const skiModel = useAppSelector(selectSkiModel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (modelId) dispatch(getSkiById(modelId))
    }, [dispatch, modelId]);

    return <div className={styles.wrapper}>
        {skiModel && <div className={styles.classicModelContainer}>
            <GoBackButtonComponent/>
            <div className={styles.skiInfo}>
                <img src={skiModel.skiImgArr[0]} alt={modelId}/>
                <h1>{skiModel.name}</h1>
                <p>{skiModel.desc}</p>
                <h2>Цена: {skiModel.priceInRubles} руб / 300$</h2>
            </div>
            <div className={styles.sizesTableContainer}>
                {skiModel.universalTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Универсальные
                        </h2>
                        {skiModel.universalTrack && skiModel.universalTrack.map((u) =>
                            <LengthItemComponent key={u.lengthString} length={u} skiName={skiModel.name}/>
                        )
                        }
                    </div>
                }
                {skiModel.hardTrack?.length !== 0 &&
                    <div className={styles.sizesTable}>
                        <h2>
                            Жесткая трасса
                        </h2>
                        {skiModel.hardTrack && skiModel.hardTrack.map((h) =>
                            <LengthItemComponent key={h.lengthString} length={h} skiName={skiModel.name}/>
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