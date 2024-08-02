import React from "react";
import styles from './ContactsComponent.module.css'
import whatsAppImg from "../../media/whatsAppImg.png"


const ContactsComponent = () => {
    const phoneNumber = "79500269523"

    function onEmailButtonClick() {
        window.location.href = `mailto:finn-ski@yandex.ru`
    }

    function onTelButtonClick() {
        window.location.href = `tel:+${phoneNumber}`
    }

    return <div className={styles.wrapper}>
        <div className={styles.contactsContainer}>
            <h2>Контакты</h2>
            <p>Отправить E-Mail: <button onClick={onEmailButtonClick} className={styles.contactButton}>finn-ski@yandex.ru</button></p>
            <p>Позвонить: <button onClick={onTelButtonClick} className={styles.contactButton}>+7-950-026-95-23</button>
            </p>
            <div>Написать в WhatsApp:<a
                className={styles.whatsAppButton}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/${phoneNumber}`}>
                <img alt={'whatsApp'} src={whatsAppImg}/>
            </a>
            </div>
        </div>
    </div>
}

export default ContactsComponent