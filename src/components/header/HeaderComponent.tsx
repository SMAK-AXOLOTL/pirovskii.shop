import React, {useState} from "react";
import styles from './HeaderComponent.module.css'
import logo from '../../media/logo.png'
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    const [screenWidth] = useState(window.innerWidth)
    const [isOpen, setIsOpen] = useState((screenWidth >= 930))

    return <div className={styles.wrapper}>
        <div onClick={() => {
            if (screenWidth < 930) setIsOpen(!isOpen)
        }}>
            <img src={logo} alt={'peltonen'}/>
            В СПб и ЛО
        </div>
        {isOpen &&
            <div className={styles.navLinks}>
                <NavLink to={'/'}>
                    <button>Главная</button>
                </NavLink>
                <NavLink to={'/allClassic'}>
                    <button>Классика</button>
                </NavLink>
                <NavLink to={'/allSkating'}>
                    <button>Коньковый Ход</button>
                </NavLink>
                <NavLink to={'/ski-poles/'}>
                    <button>Лыжные палки</button>
                </NavLink>
                <NavLink to={'/contacts'}>
                    <button>Контакты</button>
                </NavLink>
                <NavLink to={'/login'}>
                    <button>админ</button>
                </NavLink>
            </div>}
    </div>
}

export default HeaderComponent