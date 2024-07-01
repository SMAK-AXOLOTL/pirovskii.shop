import styles from "./ImagePreviewWithFullscreen.module.css"
import React, {useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {deleteNewSkiImgById} from "../../../redux/skisSlice";
import {convertToBase64} from "../../../commonFunctions/convertToBase64";
import {deleteNewSkiPoleImgById} from "../../../redux/skiPolesSlice";

type PropsType = {
    dispatchType: "ski" | "skiPole",
    src: string,
    id: string,
    index: number
}


const ImagePreviewWithFullscreen: React.FC<PropsType> = ({dispatchType, src, id, index}) => {
    const [isOpenFullscreenUiHidden, setOpenFullscreenUiHidden] = useState(true)
    const [isSkiImgFullscreenHidden, setIsSkiImgFullscreenHidden] = useState(true)
    const dispatch = useAppDispatch()

    return <div>
        <div
            className={styles.imgAndHoverElemContainer}
            onMouseEnter={() => {
                if (src) setOpenFullscreenUiHidden(false)
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
                onClick={event => event.stopPropagation()}
                className={styles.changeImgButton}>
                <label
                    onClick={event => event.stopPropagation()}>
                    <input
                        hidden
                        type={"file"}
                        onChange={e => convertToBase64(e, dispatchType, dispatch, "set", index)}
                        required={true}
                        accept={'image/*'}
                    />
                    c
                </label>
            </button>

            <button
                hidden={isOpenFullscreenUiHidden}
                className={styles.deleteButton}
                onClick={event => {
                    event.stopPropagation()
                    dispatch(deleteNewSkiImgById(index))
                    dispatch(deleteNewSkiPoleImgById(index))
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