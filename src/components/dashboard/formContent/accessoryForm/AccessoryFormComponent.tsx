import styles from "./AccessoryFormComponent.module.css";
import ImagePreviewWithFullscreen
    from "../../../commonComponents/imagePreviewWithFullscreen/ImagePreviewWithFullscreen";
import {convertToBase64} from "../../../../commonFunctions/convertToBase64";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {accessoryType} from "../../../../utils/types";
import ResizableTextArea from "../../../commonComponents/resizableTextArea/ResizableTextArea";
import AccessorySizeComponent from "../../createForm/createAccessoryComponent/sizeComponent/AccessorySizeComponent";
import {
    addNewAccessorySize,
    clearNewAccessoryData,
    selectNewAccessoryData,
    setNewAccessoryData,
    setNewAccessoryDesc,
    setNewAccessoryId,
    setNewAccessoryName,
    setNewAccessoryPriceInRubles
} from "../../../../redux/accessoriesSlice";

type PropsType = {
    initialData?: accessoryType,
    isInitialized: boolean
}

const AccessoryFormComponent: React.FC<PropsType> = ({initialData, isInitialized}) => {
    const accessory = useAppSelector(selectNewAccessoryData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        initialData ?
            dispatch(setNewAccessoryData(initialData))
            : dispatch(clearNewAccessoryData())
    }, [dispatch, initialData])

    function handleCreateSizeClick() {
        dispatch(addNewAccessorySize())
    }

    return <div className={styles.createForm}>
        <div>
            <label>ID</label>
            <input type={"text"}
                   value={accessory.id}
                   disabled={isInitialized}
                   onChange={(e) => dispatch(setNewAccessoryId(e.target.value))}/>
        </div>
        <div>
            <label>Название товара</label>
            <input type={"text"}
                   value={accessory.name}
                   onChange={(e) => dispatch(setNewAccessoryName(e.target.value))}/>
        </div>
        <div>
            <label>Описание товара</label>
            <ResizableTextArea
                value={accessory.desc}
                inputType={"dispatch"}
                maxLength={210}
                dispatchCallback={setNewAccessoryDesc}
            />
        </div>
        <div>
            <label>Цена товара в рублях</label>
            <input type={"number"}
                   min={0}
                   value={accessory.priceInRubles}
                   onChange={(e) => dispatch(setNewAccessoryPriceInRubles(e.target.value))}/>
        </div>
        <div>
            <label>Картинки</label>
            {accessory.accessoriesImgArr.length > 0 &&
                accessory.accessoriesImgArr.map((_, index) =>
                    <ImagePreviewWithFullscreen dispatchType={"accessory"} key={"accessoryImage " + index} src={accessory.accessoriesImgArr[index]}
                                                id={accessory.id} index={index}/>
                )
            }
            <input type={"file"}
                   onChange={e => convertToBase64(e, "accessory", dispatch, "add")}
                   required={true}
                   accept={'image/*'}
            />
        </div>
        <div>
            <label>
                Размер (или "универсальный")
                <button onClick={handleCreateSizeClick} className={styles.addNewLengthButton}>
                    +
                </button>
            </label>
            {accessory && accessory.sizesArray.map((l, index) =>
                <AccessorySizeComponent key={l.sizeString + index}
                                        size={l.sizeString}
                                        isReserved={l.isReserved}
                                        index={index}/>
            )}
        </div>
    </div>
}

export default AccessoryFormComponent