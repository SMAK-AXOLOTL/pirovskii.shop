import React, {useState} from "react";
import styles from './AccessorySizeComponent.module.css'
import {useAppDispatch} from "../../../../../hooks/reduxHooks";
import {deleteNewAccessorySize, setNewAccessorySize} from "../../../../../redux/accessoriesSlice";

type PropsType = {
    size: string,
    isReserved: boolean,
    index: number
}

const AccessorySizeComponent: React.FC<PropsType> = ({size, isReserved, index}) => {
    const dispatch = useAppDispatch()
    const [localSize, setLocalSize] = useState(size)
    const [reservation, setReservation] = useState(isReserved)

    const [isUpdateSizeUiOpen, setIsUpdateSizeUiOpen] = useState(false)

    function filterOutSize(index: number) {
        dispatch(deleteNewAccessorySize(index))
    }

    function handleSizeUpdate(index: number, sizeString: string, reservation: boolean) {
        const actionPayloadDTO = {index: index, length: sizeString, isReserved: reservation}
        dispatch(setNewAccessorySize(actionPayloadDTO))
    }

    function reservationChecker(reservation: boolean) {
        if (reservation) return '☑'
        return '☒'
    }

    function handleUpdateUiOpenerClick() {
        setIsUpdateSizeUiOpen(!isUpdateSizeUiOpen)
        if (isUpdateSizeUiOpen)
            handleSizeUpdate(index, localSize, reservation)
    }

    return <div>
        <label>
            <button onClick={handleUpdateUiOpenerClick}>
                {localSize + '|' + reservationChecker(reservation)}
            </button>
            {isUpdateSizeUiOpen && <div className={styles.updateUi}>
                <label>
                    Изменить размер
                </label>
                <div>
                    <input
                        value={localSize}
                        onChange={(e) => setLocalSize(e.target.value)}
                    />
                    <input
                        type={"checkbox"}
                        defaultChecked={reservation}
                        onClick={() => setReservation(!reservation)}
                    />
                </div>
            </div>}
            <button onClick={() => filterOutSize(index)}>x</button>
        </label>
    </div>
}

export default AccessorySizeComponent