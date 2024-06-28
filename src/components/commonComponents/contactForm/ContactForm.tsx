import React, {useState} from "react";
import styles from './ContactForm.module.css'
import whatAppImg from "../../../media/whatsAppImg.png"
import ResizableTextArea from "../resizableTextArea/ResizableTextArea";

const ContactForm: React.FC<{
    productName: string,
    productLength: string,
    productSize?: string,
    callBackFunc: React.Dispatch<React.SetStateAction<boolean>>
}> = ({productName, productLength, productSize, callBackFunc}) => {
    const messageSubject = `Бронь ${productName} длины ${productLength}`
    const phoneNumber = "79500269523"
    const [messageText, setMessageText] = useState(
        `Здравствуйте! Хочу узнать, есть ли ${productName.concat(" длины ", productLength, " ", (productSize ? "на вес " + productSize + " " : ""))}в наличии и можно ли их забронировать?`
    )

    function onEmailButtonClick() {
        window.location.href = `mailto:finn-ski.shop@gmail.com?subject=${messageSubject}&body=${messageText}`
    }

    function onTelButtonClick() {
        window.location.href = `tel:+${phoneNumber}`
    }

    return <div className={styles.backdrop} onClick={() => callBackFunc(false)}>
        <dialog open className={styles.dialogWrapper} onClick={(event) => event.stopPropagation()}>
            <h2>Для связи:</h2>
            <ResizableTextArea
                value={messageText}
                inputType={"setState"}
                setStateCallback={setMessageText}
            />
            <p>Отправить E-Mail: <button onClick={onEmailButtonClick} className={styles.contactButton}>finn-ski.shop@gmail.com</button></p>
            <p>Позвонить: <button onClick={onTelButtonClick} className={styles.contactButton}>+7-950-026-95-23</button></p>
            <p>Написать в WhatsApp:</p>
            <a
                className={styles.whatsAppButton}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/${phoneNumber}?text=${encodeURI(messageText)}`}>
                <img alt={'whatsApp'} src={whatAppImg}/>
            </a>
        </dialog>
    </div>

}

export default ContactForm