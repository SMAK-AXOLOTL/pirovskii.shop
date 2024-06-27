import React, {useEffect} from "react";
import styles from './SkiModelComponent.module.css'
import {getSkiById, selectSkiModel} from "../../../redux/skisSlice";
import {useParams} from "react-router-dom";
import LengthItemComponent from "./lengthItemComponent/lengthItemComponent";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination"
import {Mousewheel, Navigation, Pagination, Autoplay} from 'swiper/modules';

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
                <Swiper navigation={true}
                        mousewheel={true}
                        pagination={{clickable: true}}
                        autoplay={{delay: 2500, disableOnInteraction: true}}
                        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
                        className={styles.swiper}>
                    {skiModel.skiImgArr.map((skiImage, index) =>
                        <SwiperSlide className={styles.swiperSlide} key={"skiImage " + index}>
                            <img src={skiImage} alt={"skis"}/>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
            </div>
            <div className={styles.sizesTableContainer}>
                <h1 className={styles.plainText}>{skiModel.name}</h1>
                <p className={styles.plainText}>{skiModel.desc}</p>
                <h2 className={styles.plainText}>Цена: {skiModel.priceInRubles} руб</h2>
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