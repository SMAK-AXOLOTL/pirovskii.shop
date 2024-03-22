import React, {useEffect, useState} from "react";
import styles from './DashboardComponent.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAllSkisData,
    getClassicData,
    getSkatingData,
    selectSkis,
    selectSkiStatus,
    setSkiStatus
} from "../../redux/skisSlice";
import {AppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import DashboardItemComponent from "./dashboardItem/DashboardItemComponent";

const DashboardComponent = () => {
    const allSkisData = useSelector(selectSkis)
    const dispatch = useDispatch() as AppDispatch
    const status = useSelector(selectSkiStatus)
    const location = useLocation().pathname


    useEffect(() => {
        dispatch(setSkiStatus('idle'))
    }, [location])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllSkisData())
        }
    }, [location, status, dispatch])

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
                            <th>name</th>
                            <th>type</th>
                            <th>imgPath</th>
                            <th>hardTrack</th>
                            <th>uniTrack</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allSkisData.map(s =>
                            <tr>
                                <th>{s.id}</th>
                                <td>{s.name}</td>
                                <td>{s.skiType}</td>
                                <td>{s.skiImg}</td>
                                <td>s.hardTrack</td>
                                <td>s.universalTrack</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default DashboardComponent