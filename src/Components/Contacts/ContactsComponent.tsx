import React from "react";
import styles from './ContactsComponent.module.css'

const ContactsComponent = () => {
    return <div className={styles.wrapper}>
        <div className={styles.contactsContainer}>
            <h2>Контакты</h2>
            <div>What'sApp: +7 123 456 78 90</div>
            <div>Telegram: @pirovski.shop</div>
            <div>E-Mail: test@email.com</div>
        </div>
    </div>
}

export default ContactsComponent