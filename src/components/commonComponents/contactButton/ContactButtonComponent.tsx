import React, {useState} from "react";
import styles from "../../skis/skiModel/lengthItemComponent/lengthItemComponent.module.css";
import ContactForm from "../contactForm/ContactForm";

type PropsType = {
    productName: string,
    productLength: string,
    productWeight?: string
}

const ContactButtonComponent: React.FC<PropsType> = ({productName, productLength, productWeight}) => {
    const [isOpen, setOpen] = useState(false)

    return <div>
        {productWeight
            ? <button key={productWeight}
                      id={productWeight}
                      className={styles.weightItemContainer}
                      onClick={() => setOpen(!isOpen)}>
                {productWeight}
            </button>
            : <button key={productLength}
                      id={productLength}
                      className={styles.weightItemContainer}
                      onClick={() => setOpen(!isOpen)}>
                {productLength}
            </button>
        }
        {isOpen &&
            <ContactForm productName={productName} productLength={productLength}
                         productSize={productWeight} callBackFunc={setOpen}/>
        }
    </div>
}

export default ContactButtonComponent