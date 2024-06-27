import React, {useEffect, useState} from "react";
import styles from './DashboardComponent.module.css'
import {getAllSkiData, selectAllSkisData, selectSkiStatus, setSkiStatus} from "../../redux/skisSlice";
import {AppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {
    getAllSkiPolesData,
    selectSkiPolesData,
    selectSkiPolesStatus,
    setSkiPolesStatus
} from "../../redux/skiPolesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import CreateFormComponent from "./createForm/CreateFormComponent";
import {skiTypeEnum} from "../../enums/skiTypeEnum";
import {selectAppStatus, selectIsCreateUiOpen, setCreateUiOpen, tryLogout} from "../../redux/appStateSlice";
import TableRowSki from "./tableElements/TableRowSki";
import TableRowSkiPole from "./tableElements/TableRowSkiPole";
import TableFiltersComponent from "./tableElements/TableFiltersComponent";
import {filters} from "../../enums/filtersEnum";


const DashboardComponent = () => {
    const [filter, setFilter] = useState(filters.ALL)
    const isCreateUiOpen = useAppSelector(selectIsCreateUiOpen)
    const allSkisData = useAppSelector(selectAllSkisData)
    const allSkiPolesData = useAppSelector(selectSkiPolesData)
    const skiStatus = useAppSelector(selectSkiStatus)
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const appStatus = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch() as AppDispatch

    const location = useLocation().pathname

    useAuthRedirect()

    useEffect(() => {
        dispatch(setSkiStatus('idle'))
        dispatch(setSkiPolesStatus('idle'))
    }, [dispatch, location])

    useEffect(() => {
        if (skiStatus === 'idle' && skiPoleStatus === 'idle') {
            dispatch(getAllSkiData())
            dispatch(getAllSkiPolesData())
        }
    }, [location, skiStatus, skiPoleStatus, dispatch])

    function filterSkis(skiType: skiTypeEnum) {
        switch (filter) {
            case filters.SKIPOLES:
                return false
            case filters.SKATING:
                return skiType === skiTypeEnum.SKATING
            case filters.CLASSIC:
                return skiType === skiTypeEnum.CLASSIC
            default:
                return true
        }
    }

    function filterSkiPoles() {
        switch (filter) {
            case filters.SKIPOLES:
            case filters.ALL:
                return true
            default:
                return false
        }
    }

    function handleRefreshClick() {
        dispatch(setSkiStatus('idle'))
        dispatch(setSkiPolesStatus('idle'))
    }

    function handleLogoutClick() {
        dispatch(tryLogout())
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.dashboardContainer}>
                <div className={styles.controlElements}>
                    <div></div>
                    <button className={styles.createNewButton}
                            onClick={() => dispatch(setCreateUiOpen())}
                    >
                        Добавить новое
                    </button>
                    <div>
                        <button className={styles.controlButton}
                                disabled={skiPoleStatus === 'loading' || skiStatus === 'loading'}
                                onClick={handleRefreshClick}
                        >
                            Перезагрузить
                        </button>
                        <button className={styles.controlButton}
                                disabled={appStatus === 'loading'}
                                onClick={handleLogoutClick}
                        >
                            Выйти
                        </button>
                    </div>
                </div>
                <div className={styles.filtersAndTableContainer}>
                    <TableFiltersComponent setFilter={setFilter}/>
                    <div className={styles.dashboardTable}>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Тип</th>
                                <th>Картинка</th>
                                <th>Длина</th>
                                <th>Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allSkisData.map((s, index) => (
                                    filterSkis(s.type) &&
                                    <TableRowSki key={s.id} ski={s} index={index}/>
                                )
                            )}
                            {allSkiPolesData.map((sp, index) => (
                                    filterSkiPoles() &&
                                    <TableRowSkiPole key={sp.id} skiPole={sp} index={index}/>
                                )
                            )}
                            </tbody>
                        </table>
                        {isCreateUiOpen && <CreateFormComponent/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent