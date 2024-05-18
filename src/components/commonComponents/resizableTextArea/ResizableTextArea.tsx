import React, {useEffect, useRef} from "react";
import styles from './ResizableTextArea.module.css'
import {useAppDispatch} from "../../../hooks/reduxHooks";

type PropsType = {
    value: string,
    dispatchCallback: (payload: any) => {payload: any, type: string}
}

const ResizableTextArea:React.FC<PropsType> = ({value, dispatchCallback}) => {
    let descRef: any = useRef()
    const dispatch = useAppDispatch()

    useEffect(() => {
        descRef.current = document.getElementById("desc")
    }, []);

    const resizeDescTextArea = () => {
        descRef.current.style.height = ''
        descRef.current.style.height = descRef.current.scrollHeight / 10 + 'vh'
    }

    return <textarea
        id={"desc"}
        className={styles.textArea}
        value={value}
        onChange={(e) => {
            resizeDescTextArea()
            dispatch(dispatchCallback(e.target.value))
        }}
        required={true}/>
}

export default ResizableTextArea