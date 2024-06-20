import React from "react";
import styles from './LandingComponent.module.css'
import infra from '../../media/landing/26226_1663764843.jpeg'
import tech1 from '../../media/landing/techs1.png'
import tech2 from '../../media/landing/techs2.png'
import longSkies from '../../media/landing/long_skies.png'
import {NavLink} from "react-router-dom";

const LandingComponent = () => {
    return <div className={styles.wrapper}>
        <div className={styles.landingContainer}>
            <div className={styles.paragraph}>
                <div className={styles.imageContainer}>
                    <img src={infra} alt={'infra skis'}/>
                </div>
                <div className={styles.textContainer}>
                    <h1>О нас</h1>
                    <div className={styles.plainText}>
                        Компания PELTONEN выпускает беговые лыжи самого высокого уровня с 1945
                        года. А в 2011 году была запущена современная фабрика в городе Heinola,на
                        данный момент – самая новая в мире.
                    </div>
                    <div className={styles.plainText}>
                        Мы продаём в Санкт-Петербурге верхние модели лыж PELTONEN – уровня
                        WORLD CUP, Racing и Sport. А так же лыжные палки Rex и PELTONEN топ-
                        уровня по приемлемым ценам.
                    </div>
                </div>
            </div>
            <div className={styles.divider}/>
            <div className={styles.paragraph}>
                <div className={styles.textContainer}>
                    <h1>Современные технологии</h1>
                    <div className={styles.plainText}>
                        Компания PELTONEN первой в мире применила нанотехнологии в
                        производстве лыж – все модели класса WORLD CUP получили скользящую
                        поверхность Nano High Speed Base, прекрасно работающую в любых
                        погодных условиях и не содержащую фтора.
                    </div>
                    <div className={styles.plainText}>
                        В конструкции топовых моделей так же используется сотовый сердечник
                        NOMEX на основе кевларового волокна - легкий и прочный, без потери
                        жёсткости.
                    </div>
                    <div className={styles.plainText}>
                        Прочный карбоновый ламинат XTT Light встроен в носок и пятку лыжи для
                        снижения веса и крутящего момента.
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img src={tech1} alt={'technologies list 1'}/>
                    <img src={tech2} alt={'technologies list 2'}/>
                </div>
            </div>
            <div className={styles.divider}/>
            <div className={styles.paragraph}>
                <div className={styles.imageContainer}>
                    <img src={longSkies} alt={'skis on bench'}/>
                </div>
                <div className={styles.textContainer}>
                    <h1>Структуры и Крепления</h1>
                    <div className={styles.plainText}>
                        На все лыжи PELTONEN установлены пластины NIS под крепления Rottefella,
                        но по вашему желанию мы можем установить на шурупы крепления систем
                        SNS или ProLink. Пластина NIS держит шурупы намного лучше просто
                        поверхности лыж.
                    </div>
                    <div className={styles.plainText}>
                        Также на все модели нанесена базовая мелкая структура, хорошо работающая на
                        сухом и морозном снегу. А по специальному заказу можно нанести структуры
                        на тёплый и влажный снег – 3 вида.
                    </div>
                </div>
            </div>
            <div className={styles.navButtonsContainer}>
                <NavLink to={'/allClassic'}>
                    <button className={styles.navButton}>Классика</button>
                </NavLink>
                <NavLink to={'/allSkating'}>
                    <button className={styles.navButton}>Коньковый Ход</button>
                </NavLink>
                <NavLink to={'/allSkiPoles'}>
                    <button className={styles.navButton}>Лыжные Палки</button>
                </NavLink>
            </div>
        </div>
    </div>
}

export default LandingComponent