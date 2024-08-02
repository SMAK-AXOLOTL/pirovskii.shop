import React from "react";
import styles from '../accessories/AccessoriesComponent.module.css'
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";
import {accessoryViewAllModel} from "../../utils/types";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {selectAccessories, selectAccessoriesStatus} from "../../redux/accessoriesSlice";

const AccessoriesComponent: React.FC = () => {
    const status = useAppSelector(selectAccessoriesStatus)
    const accessoriesModels = useAppSelector(selectAccessories)

    function slideGenerator(model: accessoryViewAllModel) {
        return <div className={styles.skiModel} key={model.id}>
            <div className={styles.imgContainer}>
                <img src={model.accessoryImg} className={styles.skiImg} alt={model.name}/>
            </div>
            <div className={styles.nameAndDescBlock}>
                <h2 className={styles.skiName}>{model.name}</h2>
                <h3 className={styles.skiDesc}>{model.desc}</h3>
            </div>
            <NavLink to={`/accessories/${model.id}`} className={styles.navLink}>
                <button className={styles.goToButton}>Перейти</button>
            </NavLink>
        </div>
    }

    function allAccessoriesLayoutChanger() {
        if (window.innerWidth < 1024) {
            return <Swiper
                className={styles.wrapper}
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
            >
                {accessoriesModels.map(s =>
                    <SwiperSlide key={s.id}>
                        {slideGenerator(s)}
                    </SwiperSlide>
                )}
            </Swiper>
        }
        return <div className={styles.wrapper}>
            {accessoriesModels.map(s => slideGenerator(s))}
        </div>
    }

    return status === "loading" ? <div>Loading</div>
        : allAccessoriesLayoutChanger()
}

export default AccessoriesComponent