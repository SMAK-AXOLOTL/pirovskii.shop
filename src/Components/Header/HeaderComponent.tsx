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
        <NavLink to={'/landing'}>
            <button>Главная</button>
        </NavLink>
        <NavLink to={'/skating/supra_x'}>
            <button>Коньковый Ход</button>
        </NavLink>
        <NavLink to={'/classic/supra_x'}>
            <button>Классика</button>
        </NavLink>
        <NavLink to={'/contacts'}>
            <button>Контакты</button>
        </NavLink>
    </div>
}

export default HeaderComponent