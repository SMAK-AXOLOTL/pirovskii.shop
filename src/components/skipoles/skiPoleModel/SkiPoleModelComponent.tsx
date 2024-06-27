import React, {useEffect} from "react";
import styles from './SkiPoleModelComponent.module.css'
import {useParams} from "react-router-dom";
import {getSkiPoleById, selectSkiPoleModel} from "../../../redux/skiPolesSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";
import ContactButtonComponent from "../../commonComponents/contactButton/ContactButtonComponent";

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination"
import {Autoplay, Mousewheel, Navigation, Pagination} from 'swiper/modules';


//toDo: adjust ui
const SkiPoleModelComponent = () => {
    const {modelId} = useParams()
    const skiPole = useAppSelector(selectSkiPoleModel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (modelId) dispatch(getSkiPoleById(modelId))
    }, [dispatch, modelId]);

    return <div className={styles.wrapper}>
        {skiPole && <div className={styles.container}>
            <GoBackButtonComponent/>
            <div className={styles.skiPoleImgAndDescContainer}>
                <Swiper navigation={true}
                        mousewheel={true}
                        pagination={{clickable: true}}
                        autoplay={{delay: 2500, disableOnInteraction: true}}
                        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
                        className={styles.swiper}>
                    {skiPole.poleImgArr.map((poleImg, index) =>
                        <SwiperSlide className={styles.swiperSlide} key={"poleImg " + index}>
                            <img src={poleImg} alt={"skis"}/>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
                <h1>{skiPole.name}</h1>
                <p>{skiPole.desc}</p>
                <h2>Цена: {skiPole.priceInRubles} руб</h2>
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