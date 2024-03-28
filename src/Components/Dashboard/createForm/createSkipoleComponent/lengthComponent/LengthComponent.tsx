import React, {useState} from "react";
import styles from './LengthComponent.module.css'
import {useAppDispatch} from "../../../../../hooks/reduxHooks";
import {deleteNewSkiPoleLength, setNewSkiPoleLength} from "../../../../../redux/skiPolesSlice";

type PropsType = {
    length: string,
    isReserved: boolean,
    index: number
}

const LengthComponent: React.FC<PropsType> = ({length, isReserved, index}) => {
    const dispatch = useAppDispatch()
    const [localLength, setLocalLength] = useState(length)
    const [reservation, setReservation] = useState(isReserved)

    const [isUpdateLengthUiOpen, setIsUpdateLengthUiOpen] = useState(false)

    function filterOutLength(index: number) {
        dispatch(deleteNewSkiPoleLength(index))
    }

    function handleLengthUpdate(index: number, lengthString: string, reservation: boolean) {
        const actionPayloadDTO = {index: index, length: lengthString, isReserved: reservation}
        dispatch(setNewSkiPoleLength(actionPayloadDTO))
    }

    function reservationChecker(reservation: boolean) {
        if (reservation) return 'R'
        return 'R!'
    }

    function handleUpdateUiOpenerClick() {
        setIsUpdateLengthUiOpen(!isUpdateLengthUiOpen)
        if (isUpdateLengthUiOpen)
            handleLengthUpdate(index, localLength, reservation)
    }

    return <div>
        <label>
            <button onClick={handleUpdateUiOpenerClick}>
                {localLength + '|' + reservationChecker(reservation)}
            </button>
            {isUpdateLengthUiOpen && <div className={styles.updateUi}>
                <label>
                    Изменить длину
                </label>
                <div>
                    <input
                        value={localLength}
                        onChange={(e) => setLocalLength(e.target.value)}
                    />
                    <input
                        type={"checkbox"}
                        defaultChecked={reservation}
                        onClick={() => setReservation(!reservation)}
                    />
                </div>
            </div>}
            <button onClick={() => filterOutLength(index)}>x</button>
        </label>
    </div>
}

export default LengthComponent