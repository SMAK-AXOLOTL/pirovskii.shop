import React from "react";
import {skiLengthType, skiModel, skiWeightType} from "../../../utils/types";
import {skiTypeEnum} from "../../../enums/skiTypeEnum";
import styles from "../DashboardComponent.module.css";
import {selectIsUpdateSkiUiOpen, setIsUpdateSkiUiOpen} from "../../../redux/appStateSlice";
import {deleteSkiById, selectCurrentOpenedSkiIndex, setCurrentOpenedSkiIndex} from "../../../redux/skisSlice";
import UpdateFormComponent from "../updateForm/UpdateFormComponent";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";

const TableRowSki: React.FC<{ ski: skiModel, index: number }> = ({ski, index}) => {
    const isUpdateSkiUiOpen = useAppSelector(selectIsUpdateSkiUiOpen)
    const currentIndex = useAppSelector(selectCurrentOpenedSkiIndex)
    const dispatch = useAppDispatch()

    function skiTypeSwitcher(type: skiTypeEnum) {
        return type === skiTypeEnum.CLASSIC ? <div>Классика</div> : <div>Коньковые</div>
    }

    function handleDeleteSkiClick(id: string) {
        dispatch(deleteSkiById(id))
    }

    function weightButtonComponent(weight: skiWeightType, index: number) {
        switch (weight.isReserved) {
            case false:
                return <button key={weight.weightString + index} className={styles.weightCell}>{weight.weightString}</button>
            case true:
                return <button key={weight.weightString + index} className={`${styles.weightCell} ${styles.reserved}`}>{weight.weightString}</button>
        }
    }

    function lengthCellComponent(skiLength: skiLengthType) {
        return <div className={styles.lengthCell}>
            <span className={`${styles.lengthCellText} ${styles.bold}`}>{skiLength.lengthString}</span>: <span className={styles.weightsContainer}>{skiLength.weights.map((w, index) => weightButtonComponent(w, index))}</span>
        </div>
    }

    return <tr
        key={ski.id + '/' + ski.name}>
        <td className={styles.modelNameCell}
            onClick={() => {
                if (!isUpdateSkiUiOpen) {
                    dispatch(setIsUpdateSkiUiOpen())
                    dispatch(setCurrentOpenedSkiIndex(index))
                }
            }}
        >
            {isUpdateSkiUiOpen && (currentIndex === index) &&
                <UpdateFormComponent index={index} updateType={"ski"}/>}
            {ski.id}
        </td>
        <td>{ski.name}</td>
        <td>{skiTypeSwitcher(ski.type)}</td>
        <td>
            <img src={ski.skiImgArr[0]} alt={ski.id} className={styles.skiImage}/>
        </td>
        <td>
            {(ski.hardTrack.length > 0) && <div>
                <span className={styles.bold}>Жесткая трасса:</span>
                {ski.hardTrack.map(h => lengthCellComponent(h))}
            </div>
            }
            {(ski.universalTrack.length > 0) && <div>
                <span className={styles.bold}>Универсальные:</span>
                {
                    ski.universalTrack.map(u => lengthCellComponent(u))
                }
            </div>
            }
        </td>
        <td>
            <button className={styles.deleteButton} onClick={() => handleDeleteSkiClick(ski.id)}>X</button>
        </td>
    </tr>
}

export default TableRowSki