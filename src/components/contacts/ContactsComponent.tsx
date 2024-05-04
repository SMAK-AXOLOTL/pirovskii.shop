import React from "react";
import styles from './ContactsComponent.module.css'


const ContactsComponent = () => {
    return <div className={styles.wrapper}>
        <div className={styles.contactsContainer}>
            <h2>Контакты</h2>
            {/*<p>WhatsApp: <a href={"https://wa.me/79006564646?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%0A%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%2C%20%D0%B5%D1%81%D1%82%D1%8C%20%D0%BB%D0%B8%20%25shtooka_name%25%20%D0%B2%20%D0%BD%D0%B0%D0%BB%D0%B8%D1%87%D0%B8%D0%B8%20%D0%B8%20%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%20%D0%BB%D0%B8%20%D0%B8%D1%85%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%3F"}><img alt={'whatsApp'} src={whatAppImg}/></a></p>
            */}<div>Telegram: @pirovski.shop</div>
            <div>E-Mail: test@email.com</div>
        </div>
    </div>
}

export default ContactsComponent