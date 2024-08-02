import styles from "./ImagePreviewWithFullscreen.module.css"
import React, {useRef, useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {deleteNewSkiImgById} from "../../../redux/skisSlice";
import {convertToBase64} from "../../../commonFunctions/convertToBase64";
import {deleteNewSkiPoleImgById} from "../../../redux/skiPolesSlice";
import {deleteNewAccessoryImgById} from "../../../redux/accessoriesSlice";

type PropsType = {
    dispatchType: "ski" | "skiPole" | "accessory",
    src: string,
    id: string,
    index: number
}

const ImagePreviewWithFullscreen: React.FC<PropsType> = ({dispatchType, src, id, index}) => {
    const [isOpenFullscreenUiHidden, setOpenFullscreenUiHidden] = useState(true)
    const [isSkiImgFullscreenHidden, setIsSkiImgFullscreenHidden] = useState(true)
    const dispatch = useAppDispatch()

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    function handleChangeClick() {
        hiddenFileInput.current?.click()
    }

    return <div>
        <input
            id={'hiddenFileInput'}
            ref={hiddenFileInput}
            hidden
            type={"file"}
            onChange={e => convertToBase64(e, dispatchType, dispatch, "set", index)}
            required={true}
            accept={'image/*'}
        />
        <div
            className={styles.imgAndHoverElemContainer}
            onMouseEnter={() => {
                if(src) setOpenFullscreenUiHidden(false)
            }}
            onMouseLeave={() => {
                if (src) setOpenFullscreenUiHidden(true)
            }}
            onClick={() => {
                if (src) setIsSkiImgFullscreenHidden(false)
            }}>
            <img
                className={styles.skiImg}
                src={src}
                alt={id}
            />
            <button
                hidden={isOpenFullscreenUiHidden}
                onClick={event => {
                    event.stopPropagation()
                    handleChangeClick()
                }}
                className={styles.changeImgButton}>C
            </button>
            <button
                hidden={isOpenFullscreenUiHidden}
                className={styles.deleteButton}
                onClick={event => {
                    event.stopPropagation()
                    dispatch(deleteNewSkiImgById(index))
                    dispatch(deleteNewSkiPoleImgById(index))
                    dispatch(deleteNewAccessoryImgById(index))
                }}>X
            </button>
        </div>
        <div
            className={styles.skiImgFullscreen}
            hidden={isSkiImgFullscreenHidden}>
            <button
                onClick={() => setIsSkiImgFullscreenHidden(true)}>X
            </button>
            <img
                src={src} alt={id}
            />
        </div>
    </div>
}

export default ImagePreviewWithFullscreen