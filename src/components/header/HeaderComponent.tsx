import React, {useState} from "react";
import styles from './HeaderComponent.module.css'
import logo from '../../media/logo.png'
import {NavLink} from "react-router-dom";


//todo: animate menu open-close sequence
const HeaderComponent = () => {
    const desktopScreenWidthInPx = 1023
    const [screenWidth] = useState(window.innerWidth)
    const [isOpen, setIsOpen] = useState((screenWidth > desktopScreenWidthInPx))

    function ifMobileClickHandler() {
        if (screenWidth <= desktopScreenWidthInPx) {
            setIsOpen(!isOpen)
        }
    }

    const HeaderItem: React.FC<{ buttonText: string, whereTo?: string }> = ({buttonText, whereTo}) => {
        return whereTo
            ? <NavLink to={`/${whereTo}`}>
                <button onClick={ifMobileClickHandler}>{buttonText}</button>
            </NavLink>
            : <NavLink to={"/"}>
                <button onClick={ifMobileClickHandler}>{buttonText}</button>
            </NavLink>
    }

    return <div className={styles.wrapper}>
        <div className={styles.menuControls} onClick={() => {
            if (screenWidth <= desktopScreenWidthInPx) setIsOpen(!isOpen)
        }}>
            <span hidden={(screenWidth > desktopScreenWidthInPx)}>
                ☰
            </span>
            <img src={logo} alt={'peltonen'}/> В СПб и ЛО
        </div>
        {isOpen &&
            <div className={styles.navLinks}>
                <HeaderItem buttonText={"Главная"} key={"main"}/>
                <HeaderItem buttonText={"Классика"} whereTo={"allClassic"} key={"classic"}/>
                <HeaderItem buttonText={"Коньковый Ход"} whereTo={"allSkating"} key={"skating"}/>
                <HeaderItem buttonText={"Лыжные палки"} whereTo={"ski-poles"} key={"ski-poles"}/>
                <HeaderItem buttonText={"Контакты"} whereTo={"contacts"} key={"contacts"}/>
                <HeaderItem buttonText={"админ"} whereTo={"login"} key={"loginPage"}/>
            </div>}
    </div>
}

export default HeaderComponent