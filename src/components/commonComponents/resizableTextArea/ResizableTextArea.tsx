import React, {useEffect, useRef} from "react";
import styles from './ResizableTextArea.module.css'
import {useAppDispatch} from "../../../hooks/reduxHooks";

type PropsType = {
    value: string,
    inputType: "setState" | "dispatch",
    dispatchCallback?: (payload: any) => { payload: any, type: string },
    setStateCallback?: React.Dispatch<React.SetStateAction<string>>
}

const ResizableTextArea: React.FC<PropsType> = ({value, inputType, dispatchCallback, setStateCallback}) => {
    let descRef: any = useRef()
    const dispatch = useAppDispatch()

    useEffect(() => {
        descRef.current = document.getElementById("textArea")
    }, []);

    const resizeDescTextArea = () => {
        descRef.current.style.height = ''
        descRef.current.style.height = descRef.current.scrollHeight / 10 + 'vh'
    }

    return <textarea
        id={"textArea"}
        className={styles.textArea}
        value={value}
        onChange={(e) => {
            resizeDescTextArea()
            switch (inputType) {
                case "setState":
                    if (!setStateCallback) {
                        throw new Error("No setState callback provided")
                    }
                    setStateCallback(e.target.value)
                    break;

                case "dispatch":
                    if (!dispatchCallback) {
                        throw new Error("No dispatch-able callback provided")
                    }
                    dispatch(dispatchCallback(e.target.value))
                    break;
            }
        }}
        required={true}/>
}

export default ResizableTextArea