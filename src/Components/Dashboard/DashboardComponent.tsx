import React, {useEffect, useState} from "react";
import styles from './DashboardComponent.module.css'
import {
    deleteSkiById,
    getAllSkisData,
    selectSkis,
    selectSkiStatus,
    setSkiStatus,
    updateOneSkiData
} from "../../redux/skisSlice";
import {AppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {getAllSkiPolesData, selectSkiPoles, selectSkiPolesStatus, setSkiPolesStatus} from "../../redux/skiPolesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {skiModelType} from "../../utils/types";
import UpdateFormComponent from "./updateForm/UpdateFormComponent";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import CreateFormComponent from "./createForm/CreateFormComponent";


//todo: finish updating and creating weights
const DashboardComponent = () => {
    const [isUpdateUiOpen, setUpdateUiOpen] = useState(false)
    const [isCreateUiOpen, setCreateUiOpen] = useState(false)
    const allSkisData = useAppSelector(selectSkis)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
    const dispatch = useAppDispatch() as AppDispatch
    const skiStatus = useAppSelector(selectSkiStatus)
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const location = useLocation().pathname

    useAuthRedirect()

    useEffect(() => {
        dispatch(setSkiStatus('idle'))
        dispatch(setSkiPolesStatus('idle'))
    }, [])

    useEffect(() => {
        dispatch(setSkiStatus('idle'))
        dispatch(setSkiPolesStatus('idle'))
    }, [dispatch, location])

    useEffect(() => {
        if (skiStatus === 'idle' && skiPoleStatus === 'idle') {
            dispatch(getAllSkisData())
            dispatch(getAllSkiPolesData())
        }
    }, [location, skiStatus, skiPoleStatus, dispatch])

    function handleClick(id:string) {
        dispatch(deleteSkiById(id))
    }
    function handleUpdate(id:string, data:skiModelType){
        const requestData = {id: id, data: data}
        dispatch(updateOneSkiData(requestData))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.dashboardContainer}>
                <div>
                    <button className={styles.createNewButton} onClick={() => setCreateUiOpen(!isCreateUiOpen)}>Добавить новое</button>
                </div>
                <div className={styles.controlsAndTableContainer}>
                    <div className={styles.controlElements}>
                        <button>Все товары</button>
                        <button>Лыжи</button>
                        <button className={styles.subCategory}>Классика</button>
                        <button className={styles.subCategory}>Коньковые</button>
                        <button>Прочее</button>
                        <button className={styles.subCategory}>Палки</button>
                    </div>
                    <div className={styles.dashboardTable}>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Тип</th>
                                <th>Путь до картинки</th>
                                <th>Свойства</th>
                                <th>Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allSkisData.map(s => (
                                <tr key={s.id + '/' + s.name}>
                                    <th>{s.id}</th>
                                    <td>{s.name}</td>
                                    <td>{s.type}</td>
                                    <td>{s.skiImg}</td>
                                    <td>
                                        <button onClick={() => setUpdateUiOpen(!isUpdateUiOpen)}>Перейти</button>
                                    </td>
                                    <td>
                                        <button className={styles.deleteButton} onClick={() => handleClick(s.id)}>X</button>
                                    </td>
                                </tr>
                            ))}
                            {allSkiPolesData.map(sp => (
                                <tr key={sp.id + '/' + sp.name}>
                                    <th>{sp.id}</th>
                                    <td>{sp.name}</td>
                                    <td>Палка</td>
                                    <td>{sp.poleImg}</td>
                                    <td>
                                        <button>Открыть</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {isUpdateUiOpen && <UpdateFormComponent/>}
                        {isCreateUiOpen && <CreateFormComponent/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent