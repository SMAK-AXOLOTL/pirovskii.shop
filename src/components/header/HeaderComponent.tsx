import React, {useState} from "react";
import styles from './HeaderComponent.module.css'
import logo from '../../media/logo.png'
import {NavLink} from "react-router-dom";


//todo: animate menu open-close sequence
const HeaderComponent = () => {
    const [screenWidth] = useState(window.innerWidth)
    const [isOpen, setIsOpen] = useState((screenWidth > 930))

    function ifMobileClickHandler(){
        if(screenWidth <= 930){
            setIsOpen(!isOpen)
        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.menuControls} onClick={() => {
            if (screenWidth <= 930) setIsOpen(!isOpen)
        }}>
            <span hidden={(screenWidth > 930)}>
                ☰
            </span>
            <img src={logo} alt={'peltonen'}/> В СПб и ЛО
        </div>
        {isOpen &&
            <div className={styles.navLinks}>
                <NavLink to={'/'}>
                    <button onClick={ifMobileClickHandler}>Главная</button>
                </NavLink>
                <NavLink to={'/allClassic'}>
                    <button onClick={ifMobileClickHandler}>Классика</button>
                </NavLink>
                <NavLink to={'/allSkating'}>
                    <button onClick={ifMobileClickHandler}>Коньковый Ход</button>
                </NavLink>
                <NavLink to={'/ski-poles/'}>
                    <button onClick={ifMobileClickHandler}>Лыжные палки</button>
                </NavLink>
                <NavLink to={'/contacts'}>
                    <button onClick={ifMobileClickHandler}>Контакты</button>
                </NavLink>
                <NavLink to={'/login'}>
                    <button onClick={ifMobileClickHandler}>админ</button>
                </NavLink>
            </div>}
    </div>
}

export default HeaderComponent