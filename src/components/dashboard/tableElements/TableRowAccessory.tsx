import React from "react";
import {accessorySizeType, accessoryType} from "../../../utils/types";
import styles from "../DashboardComponent.module.css";
import {selectIsUpdateAccessoryUiOpen, setIsUpdateAccessoryUiOpen} from "../../../redux/appStateSlice";
import {selectCurrentOpenedSkiIndex, setCurrentOpenedSkiIndex} from "../../../redux/skisSlice";
import UpdateFormComponent from "../updateForm/UpdateFormComponent";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {deleteAccessoryById} from "../../../redux/accessoriesSlice";

const TableRowAccessory: React.FC<{ accessory: accessoryType, index: number }> = ({accessory, index}) => {
    const isUpdateAccessoryUiOpen = useAppSelector(selectIsUpdateAccessoryUiOpen)
    const currentIndex = useAppSelector(selectCurrentOpenedSkiIndex)
    const dispatch = useAppDispatch()

    function handleDeleteAccessoryClick(id: string) {
        dispatch(deleteAccessoryById(id))
    }

    function sizeButtonComponent(size: accessorySizeType, index: number) {
        switch (size.isReserved) {
            case false:
                return <button className={styles.weightCell} key={size.sizeString + index}>{size.sizeString}</button>
            case true:
                return <button className={`${styles.weightCell} ${styles.reserved}`}  key={size.sizeString + index}>{size.sizeString}</button>
        }
    }

    return <tr key={accessory.id + '/' + accessory.name}>
        <td
            className={styles.modelNameCell}
            onClick={() => {
                if (!isUpdateAccessoryUiOpen) {
                    dispatch(setIsUpdateAccessoryUiOpen())
                    dispatch(setCurrentOpenedSkiIndex(index))
                }
            }}
        >
            {isUpdateAccessoryUiOpen && (currentIndex === index) &&
                <UpdateFormComponent index={index} updateType={"accessory"}/>}
            {accessory.id}
        </td>
        <td>{accessory.name}</td>
        <td>Аксессуар</td>
        <td>
            <img src={accessory.accessoriesImgArr[0]} alt={accessory.id} className={styles.skiImage}/>
        </td>
        <td>
            <div className={`${styles.bold}`}>Размеры в наличии:</div>
            {accessory.sizesArray.map((l, index) => sizeButtonComponent(l, index))}</td>
        <td>
            <button className={styles.deleteButton}
                    onClick={() => handleDeleteAccessoryClick(accessory.id)}>X
            </button>
        </td>
    </tr>
}

export default TableRowAccessory