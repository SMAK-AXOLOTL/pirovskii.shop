import React, {useEffect} from "react";
import styles from './DashboardComponent.module.css'
import {getAllSkisData, selectSkis, selectSkiStatus, setSkiStatus} from "../../redux/skisSlice";
import {AppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {getAllSkiPolesData, selectSkiPoles, selectSkiPolesStatus, setSkiPolesStatus} from "../../redux/skiPolesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";

const DashboardComponent = () => {
    const allSkisData = useAppSelector(selectSkis)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
    const dispatch = useAppDispatch() as AppDispatch
    const skiStatus = useAppSelector(selectSkiStatus)
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const location = useLocation().pathname


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

    return (
        <div className={styles.wrapper}>
            <div className={styles.dashboardContainer}>
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
                        </tr>
                        </thead>
                        <tbody>
                        {allSkisData.map(s => (
                            <tr>
                                <th>{s.id}</th>
                                <td>{s.name}</td>
                                <td>{s.skiType}</td>
                                <td>{s.skiImg}</td>
                                <td>
                                    <button>Перейти</button>
                                </td>
                            </tr>
                        ))}
                        {allSkiPolesData.map(sp => (
                            <tr>
                                <th>{sp.id}</th>
                                <td>{sp.name}</td>
                                <td>Палка</td>
                                <td>{sp.poleImg}</td>
                                <td>
                                    <button>Перейти</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default DashboardComponent