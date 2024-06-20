import React from "react";
import styles from './AllSkisComponent.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectClassicSkis, selectSkatingSkis, selectSkiStatus} from "../../redux/skisSlice";
import {skiTypeEnum} from "../../enums/skiTypeEnum";
import {skiViewAllModel} from "../../utils/types";
import {NavLink} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AllSkisComponent: React.FC<{ skiType: skiTypeEnum }> = ({skiType}) => {
    const status = useAppSelector(selectSkiStatus)
    const classicSkis = useAppSelector(selectClassicSkis)
    const skatingSkis = useAppSelector(selectSkatingSkis)

    function slideGenerator(model: skiViewAllModel) {
        return <div className={styles.skiModel} key={model.id}>
            <div className={styles.imgContainer}>
                <img src={model.skiImg} className={styles.skiImg} alt={model.name}/>
            </div>
            <div className={styles.nameAndDescBlock}>
                <h2 className={styles.skiName}>{model.name}</h2>
                <h3 className={styles.skiDesc}>{model.desc}</h3>
            </div>
            <NavLink to={`/${model.type.toLowerCase()}/${model.id}`} className={styles.navLink}>
                <button className={styles.goToButton}>Перейти</button>
            </NavLink>
        </div>
    }

    function allSkisLayoutChanger() {
        if (window.innerWidth < 1024) {
            return <Swiper
                className={styles.wrapper}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
            >
                {skiType === skiTypeEnum.CLASSIC
                    ? classicSkis.map(c =>
                        <SwiperSlide key={c.id}>
                            {slideGenerator(c)}
                        </SwiperSlide>)
                    : skatingSkis.map(s =>
                        <SwiperSlide key={s.id}>
                            {slideGenerator(s)}
                        </SwiperSlide>)}
            </Swiper>
        }
        return <div className={styles.wrapper}>
            {skiType === skiTypeEnum.CLASSIC
                ? classicSkis.map(c => slideGenerator(c))
                : skatingSkis.map(s => slideGenerator(s))}
        </div>
    }

    return status === "loading" ? <div>Loading</div>
        : allSkisLayoutChanger()
}

export default AllSkisComponent