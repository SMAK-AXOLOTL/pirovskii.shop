import React from "react";
import styles from './HeaderComponent.module.css'
import logo from '../../media/logo.png'
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    return <div className={styles.wrapper}>
        <div>
            <img src={logo} alt={'peltonen'}/>
            В СПб и ЛО
        </div>
        <NavLink to={'/'}>
            <button>Главная</button>
        </NavLink>
        <NavLink to={'/allClassic'}>
            <button>Классика</button>
        </NavLink>
        <NavLink to={'/allSkating'}>
            <button>Коньковый Ход</button>
        </NavLink>
        <NavLink to={'/ski-poles/palka1'}>
            <button>Лыжные палки</button>
        </NavLink>
        <NavLink to={'/contacts'}>
            <button>Контакты</button>
        </NavLink>
        <NavLink to={'/login'}>
            <button>админ</button>
        </NavLink>
    </div>
}

export default HeaderComponent