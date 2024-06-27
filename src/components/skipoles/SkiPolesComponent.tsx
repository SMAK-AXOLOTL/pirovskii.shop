import React from "react";
import styles from '../skis/AllSkisComponent.module.css'
import {NavLink} from "react-router-dom";
import {selectSkiPoles, selectSkiPolesStatus} from "../../redux/skiPolesSlice";
import {useAppSelector} from "../../hooks/reduxHooks";
import {skiPoleViewAllModel} from "../../utils/types";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SkiPolesComponent: React.FC = () => {
    const status = useAppSelector(selectSkiPolesStatus)
    const skiPolesModels = useAppSelector(selectSkiPoles)

    function slideGenerator(model: skiPoleViewAllModel) {
        return <div className={styles.skiModel} key={model.id}>
            <div className={styles.imgContainer}>
                <img src={model.poleImg} className={styles.skiImg} alt={model.name}/>
            </div>
            <div className={styles.nameAndDescBlock}>
                <h2 className={styles.skiName}>{model.name}</h2>
                <h3 className={styles.skiDesc}>{model.desc}</h3>
            </div>
            <NavLink to={`/ski-poles/${model.id}`} className={styles.navLink}>
                <button className={styles.goToButton}>Перейти</button>
            </NavLink>
        </div>
    }

    function allSkiPolesLayoutChanger() {
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
                {skiPolesModels.map(s =>
                    <SwiperSlide key={s.id}>
                        {slideGenerator(s)}
                    </SwiperSlide>
                )}
            </Swiper>
        }
        return <div className={styles.wrapper}>
            {skiPolesModels.map(s => slideGenerator(s))}
        </div>
    }

    return status === "loading" ? <div>Loading</div>
        : allSkiPolesLayoutChanger()
}

export default SkiPolesComponent