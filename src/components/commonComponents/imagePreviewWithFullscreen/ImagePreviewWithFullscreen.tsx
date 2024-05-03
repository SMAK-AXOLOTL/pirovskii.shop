import styles from "./ImagePreviewWithFullscreen.module.css"
import React, {useState} from "react";

type PropsType = {
    src: string,
    id: string
}

const ImagePreviewWithFullscreen: React.FC<PropsType> = ({src, id}) => {
    const [isOpenFullscreenUiHidden, setOpenFullscreenUiHidden] = useState(true)
    const [isSkiImgFullscreenHidden, setIsSkiImgFullscreenHidden] = useState(true)

    return <div>
        <div className={styles.imgAndHoverElemContainer}>
            <img className={styles.skiImg} src={src} alt={id}
                 onMouseEnter={() => {
                     if (src) setOpenFullscreenUiHidden(false)
                 }}
                 onMouseLeave={() => {
                     if (src) setOpenFullscreenUiHidden(true)
                 }}
                 onClick={() => {
                     if (src) setIsSkiImgFullscreenHidden(false)
                 }}
            />
            <h1 hidden={isOpenFullscreenUiHidden} className={styles.openImgFullscreenOnHover}>🔎</h1>
        </div>
        <div className={styles.skiImgFullscreen} hidden={isSkiImgFullscreenHidden}>
            <button onClick={() => setIsSkiImgFullscreenHidden(true)}>x</button>
            <img src={src} alt={id}/>
        </div>
    </div>
}

export default ImagePreviewWithFullscreen