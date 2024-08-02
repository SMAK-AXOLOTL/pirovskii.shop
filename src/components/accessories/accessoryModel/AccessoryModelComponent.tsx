import React, {useEffect} from "react";
import styles from './AccessoryModelComponent.module.css'
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import GoBackButtonComponent from "../../commonComponents/goBackButton/GoBackButtonComponent";
import ContactButtonComponent from "../../commonComponents/contactButton/ContactButtonComponent";

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination"
import {Autoplay, Mousewheel, Navigation, Pagination} from 'swiper/modules';
import {getAccessoryById, selectAccessoryModel} from "../../../redux/accessoriesSlice";


const AccessoryModelComponent = () => {
    const {modelId} = useParams()
    const accessory = useAppSelector(selectAccessoryModel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (modelId) dispatch(getAccessoryById(modelId))
    }, [dispatch, modelId]);

    return <div className={styles.wrapper}>
        {accessory && <div className={styles.container}>
            <GoBackButtonComponent/>
            <div className={styles.swiperContainer}>
                <Swiper navigation={true}
                        mousewheel={true}
                        pagination={{clickable: true}}
                        autoplay={{delay: 2500, disableOnInteraction: true}}
                        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
                        className={styles.swiper}>
                    {accessory.accessoriesImgArr.map((accessoryImg, index) =>
                        <SwiperSlide className={styles.swiperSlide} key={"accessoryImg " + index}>
                            <img src={accessoryImg} alt={"skis"}/>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
            </div>
            <div className={styles.skiPoleImgAndDescContainer}>
                <h1>{accessory.name}</h1>
                <p>{accessory.desc}</p>
                <h2>Цена: {accessory.priceInRubles} руб</h2>
                <h4>Представленные размеры</h4>
                <div className={styles.lengthTable}>
                    {accessory.sizesArray?.map((sizeItem, index) => (
                        sizeItem.isReserved ?
                            <button key={sizeItem.sizeString + index} disabled={true} className={styles.lengthItm}>
                                {sizeItem.sizeString}
                            </button>
                            : <ContactButtonComponent
                                key={sizeItem.sizeString + index}
                                productName={accessory.name}
                                productLength={sizeItem.sizeString}
                            />
                    ))}
                </div>
            </div>
        </div>}
    </div>
}

export default AccessoryModelComponent