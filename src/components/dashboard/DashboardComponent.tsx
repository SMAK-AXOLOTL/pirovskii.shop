import React, {useEffect, useState} from "react";
import styles from './DashboardComponent.module.css'
import {
    deleteSkiById,
    getAllSkisData,
    selectCurrentOpenedSkiIndex,
    selectSkis,
    selectSkiStatus, setCurrentOpenedSkiIndex,
    setSkiStatus
} from "../../redux/skisSlice";
import {AppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {
    deleteSkiPoleById,
    getAllSkiPolesData,
    selectSkiPoles,
    selectSkiPolesStatus,
    setSkiPolesStatus
} from "../../redux/skiPolesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import CreateFormComponent from "./createForm/CreateFormComponent";
import UpdateFormComponent from "./updateForm/UpdateFormComponent";
import {skiModel, skiPoleType} from "../../utils/types";
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import {
    selectAppStatus,
    selectIsCreateUiOpen,
    selectIsUpdateSkiPoleUiOpen,
    selectIsUpdateSkiUiOpen, setCreateUiOpen, setIsUpdateSkiPoleUiOpen, setIsUpdateSkiUiOpen,
    tryLogout
} from "../../redux/appStateSlice";

enum filters {
    ALL = 'all',
    SKIS = 'skis',
    CLASSIC = 'classic',
    SKATING = 'skating',
    SKIPOLES = 'skiPoles'
}

const DashboardComponent = () => {
    const [filter, setFilter] = useState(filters.ALL)
    const currentIndex = useAppSelector(selectCurrentOpenedSkiIndex)

    const isCreateUiOpen = useAppSelector(selectIsCreateUiOpen)
    const isUpdateSkiUiOpen = useAppSelector(selectIsUpdateSkiUiOpen)
    const isUpdateSkiPoleUiOpen = useAppSelector(selectIsUpdateSkiPoleUiOpen)
    const allSkisData = useAppSelector(selectSkis)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
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
            dispatch(getAllSkisData())
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

    function handleDeleteSkiClick(id: string) {
        dispatch(deleteSkiById(id))
    }

    function handleDeleteSkiPoleClick(id: string) {
        dispatch(deleteSkiPoleById(id))
    }

    function handleRefreshClick() {
        dispatch(setSkiStatus('idle'))
        dispatch(setSkiPolesStatus('idle'))
    }

    function handleLogoutClick() {
        dispatch(tryLogout())
    }

    const TableRowSki: React.FC<{ ski: skiModel, index: number }> = ({ski, index}) => {

        function skiTypeSwitcher(type: skiTypeEnum) {
            return type === skiTypeEnum.CLASSIC ? <div>Классика</div> : <div>Коньковые</div>
        }

        return <tr
            key={ski.id + '/' + ski.name}>
            <td style={{fontWeight: "bold"}}>
                <button onClick={() => {
                    dispatch(setIsUpdateSkiUiOpen())
                    dispatch(setCurrentOpenedSkiIndex(index))
                }}>🖊
                </button>
                {isUpdateSkiUiOpen && (currentIndex === index) &&
                    <UpdateFormComponent index={index} updateType={"ski"}/>}
                {ski.id}
            </td>
            <td>{ski.name}</td>
            <td>{skiTypeSwitcher(ski.type)}</td>
            <td>
                <img src={ski.skiImg} alt={ski.id} className={styles.skiImage}/>
            </td>
            <td>
                {(ski.hardTrack.length > 0) && <div>
                    Жесткая трасса:
                    {ski.hardTrack.map(h => <button key={h.lengthString}>{h.lengthString}</button>)}
                </div>
                }
                {(ski.universalTrack.length > 0) && <div>
                    Универсальные:
                    {
                        ski.universalTrack.map(u => <button key={u.lengthString}>{u.lengthString}</button>)
                    }
                </div>
                }
            </td>
            <td>
                <button className={styles.deleteButton} onClick={() => handleDeleteSkiClick(ski.id)}>X</button>
            </td>
        </tr>
    }

    const TableRowSkiPole: React.FC<{ skiPole: skiPoleType, index: number }> = ({skiPole, index}) => {

        return <tr key={skiPole.id + '/' + skiPole.name}>
            <td style={{fontWeight: "bold"}}>
                <button onClick={() => {
                    dispatch(setIsUpdateSkiPoleUiOpen())
                    dispatch(setCurrentOpenedSkiIndex(index))
                }}>🖊
                </button>
                {isUpdateSkiPoleUiOpen && (currentIndex === index) &&
                    <UpdateFormComponent index={index} updateType={"skiPole"}/>}
                {skiPole.id}
            </td>
            <td>{skiPole.name}</td>
            <td>Палки</td>
            <td>
                <img src={skiPole.poleImg} alt={skiPole.id} className={styles.skiImage}/>
            </td>
            <td>{skiPole.lengthArray.map((l, index) => <button
                key={l.lengthString + index}>{l.lengthString}</button>)}</td>
            <td>
                <button className={styles.deleteButton}
                        onClick={() => handleDeleteSkiPoleClick(skiPole.id)}>X
                </button>
            </td>
        </tr>
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
                    <div className={styles.filtersElements}>
                        <button onClick={() => setFilter(filters.ALL)}>Все товары</button>
                        <button onClick={() => setFilter(filters.SKIS)}>Лыжи</button>
                        <button className={styles.subCategory} onClick={() => setFilter(filters.CLASSIC)}>Классика
                        </button>
                        <button className={styles.subCategory} onClick={() => setFilter(filters.SKATING)}>Коньковые
                        </button>
                        <button onClick={() => setFilter(filters.SKIPOLES)}>Прочее</button>
                        <button className={styles.subCategory} onClick={() => setFilter(filters.SKIPOLES)}>Палки
                        </button>
                    </div>
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