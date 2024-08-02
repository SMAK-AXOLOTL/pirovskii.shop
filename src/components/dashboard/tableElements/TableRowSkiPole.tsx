import React from "react";
import {skiPoleLengthType, skiPoleType} from "../../../utils/types";
import styles from "../DashboardComponent.module.css";
import {selectIsUpdateSkiPoleUiOpen, setIsUpdateSkiPoleUiOpen} from "../../../redux/appStateSlice";
import {selectCurrentOpenedSkiIndex, setCurrentOpenedSkiIndex} from "../../../redux/skisSlice";
import UpdateFormComponent from "../updateForm/UpdateFormComponent";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {deleteSkiPoleById} from "../../../redux/skiPolesSlice";

const TableRowSkiPole: React.FC<{ skiPole: skiPoleType, index: number }> = ({skiPole, index}) => {
    const isUpdateSkiPoleUiOpen = useAppSelector(selectIsUpdateSkiPoleUiOpen)
    const currentIndex = useAppSelector(selectCurrentOpenedSkiIndex)
    const dispatch = useAppDispatch()

    function handleDeleteSkiPoleClick(id: string) {
        dispatch(deleteSkiPoleById(id))
    }

    function lengthButtonComponent(size: skiPoleLengthType, index: number) {
        switch (size.isReserved) {
            case false:
                return <button className={styles.weightCell} key={size.lengthString + index}>{size.lengthString}</button>
            case true:
                return <button className={`${styles.weightCell} ${styles.reserved}`}  key={size.lengthString + index}>{size.lengthString}</button>
        }
    }

    return <tr key={skiPole.id + '/' + skiPole.name}>
        <td
            className={styles.modelNameCell}
            onClick={() => {
                if (!isUpdateSkiPoleUiOpen) {
                    dispatch(setIsUpdateSkiPoleUiOpen())
                    dispatch(setCurrentOpenedSkiIndex(index))
                }
            }}
        >
            {isUpdateSkiPoleUiOpen && (currentIndex === index) &&
                <UpdateFormComponent index={index} updateType={"skiPole"}/>}
            {skiPole.id}
        </td>
        <td>{skiPole.name}</td>
        <td>Палки</td>
        <td>
            <img src={skiPole.poleImgArr[0]} alt={skiPole.id} className={styles.skiImage}/>
        </td>
        <td>
            <div className={`${styles.bold}`}>Размеры в наличии:</div>
            {skiPole.lengthArray.map((l, index) => lengthButtonComponent(l, index))}</td>
        <td>
            <button className={styles.deleteButton}
                    onClick={() => handleDeleteSkiPoleClick(skiPole.id)}>X
            </button>
        </td>
    </tr>
}

export default TableRowSkiPole