import React from "react";
import styles from './LandingComponent.module.css'
import infra from '../../media/landing/26226_1663764843.jpeg'
import tech1 from '../../media/landing/techs1.png'
import tech2 from '../../media/landing/techs2.png'
import onBench from '../../media/landing/skies_on_bench.jpg'
import {NavLink} from "react-router-dom";

const LandingComponent = () => {
    return <div className={styles.wrapper}>
        <div className={styles.paragraph}>
            <div className={styles.imageContainer}>
                <img src={infra} alt={'infra skis'}/>
            </div>
            <div  className={styles.textContainer}>
                <h1>Supra X</h1>
                <div style={{width: '70%'}}>
                    Все мы знаем и любим надёжные лыжи Peltonen!
                    Однако, реалии жизни таковы, что достать их сегодня в Санкт-Петербурге и Ленинградской Области
                    задача не из простых.
                </div>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.paragraph}>
            <div className={styles.textContainer}>
                <h1>Новейшие технологии</h1>
                <div style={{width: '70%'}}>
                    Все мы знаем и любим надёжные лыжи Peltonen!
                    Однако, реалии жизни таковы, что достать их сегодня в Санкт-Петербурге и Ленинградской Области
                    задача не из простых.
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img src={tech1} alt={'technologies list 1'}/>
                <img src={tech2} alt={'technologies list 2'}/>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.paragraph}>
            <div className={styles.imageContainer}>
                <img src={onBench} alt={'skis on bench'}/>
            </div>
            <div className={styles.textContainer}>
                <h1>Нанесем Вам покрытие</h1>
                <div style={{width: '70%'}}>
                    Все мы знаем и любим надёжные лыжи Peltonen!
                    Однако, реалии жизни таковы, что достать их сегодня в Санкт-Петербурге и Ленинградской Области
                    задача не из простых.
                </div>
            </div>
        </div>
        <div className={styles.buttonsContainer}>
            <NavLink to={'/skating/supra_x'}>
                <button>Коньковый Ход</button>
            </NavLink>
            <NavLink to={'/easter-egg'}>
                <button>Связаться с нами</button>
            </NavLink>
            <button>Классика</button>
        </div>
    </div>
}

export default LandingComponent