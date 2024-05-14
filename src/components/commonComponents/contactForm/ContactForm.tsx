import React, {useState} from "react";
import styles from './ContactForm.module.css'
import whatAppImg from "../../../media/whatsAppImg.png"

//todo: style contactForm
//todo: stop textarea reformatting
//todo: add telegram functionality (if needed)
const ContactForm: React.FC<{
    productName: string,
    productLength: string,
    productSize?: string,
    callBackFunc: React.Dispatch<React.SetStateAction<boolean>>
}> = ({productName, productLength, productSize, callBackFunc}) => {
    const [messageText, setMessageText] = useState(`Здравствуйте! Хочу узнать, есть ли ${productName.concat(" ", productLength, " ", (productSize ? productSize : ""))} в наличии и можно ли их забронировать?`)

    return <div className={styles.backdrop} onClick={() => callBackFunc(false)}>
        <dialog open className={styles.dialogWrapper} onClick={(event) => event.stopPropagation()}>
            <h2>Для связи:</h2>
            <p>Телефон: +1-234-567-89-00</p>
            <textarea
                autoFocus={true}
                className={styles.messageArea}
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
            />
            <p>WhatsApp:
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/79046095822?text=${encodeURI(messageText)}`}>
                    <img alt={'whatsApp'} src={whatAppImg}/>
                </a>
            </p>
        </dialog>
    </div>

}

export default ContactForm