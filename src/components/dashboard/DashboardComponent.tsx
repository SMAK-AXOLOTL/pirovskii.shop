import React, {useEffect, useState} from "react";
import styles from './DashboardComponent.module.css'
import {deleteSkiById, getAllSkisData, selectSkis, selectSkiStatus, setSkiStatus} from "../../redux/skisSlice";
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
import {checkAuth} from "../../redux/appStateSlice";

enum filters {
    ALL = 'all',
    SKIS = 'skis',
    CLASSIC = 'classic',
    SKATING = 'skating',
    SKIPOLES = 'skiPoles'
}
//fixme refreshing page breaks user auth
//todo add working with files, data validation
const DashboardComponent = () => {
    const [isCreateUiOpen, setCreateUiOpen] = useState(false)
    const [filter, setFilter] = useState(filters.ALL)

    const allSkisData = useAppSelector(selectSkis)
    const allSkiPolesData = useAppSelector(selectSkiPoles)
    const dispatch = useAppDispatch() as AppDispatch
    const skiStatus = useAppSelector(selectSkiStatus)
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const location = useLocation().pathname

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch]);

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
        switch (filter){
            case filters.SKIPOLES:
            case filters.ALL: return true
            default: return false
        }
    }

    function handleDeleteSkiClick(id: string) {
        dispatch(deleteSkiById(id))
    }

    function handleDeleteSkiPoleClick(id: string) {
        dispatch(deleteSkiPoleById(id))
    }

    const TableRowSki: React.FC<{ ski: skiModel, index: number }> = ({ski, index}) => {
        const [isUpdateUiOpen, setUpdateUiOpen] = useState(false)

        return <tr
            key={ski.id + '/' + ski.name}>
            < th> {ski.id}
            </th>
            <td>{ski.name}</td>
            <td>{ski.type}</td>
            <td>{ski.skiImg}</td>
            <td>
                <button onClick={() => setUpdateUiOpen(!isUpdateUiOpen)}>Открыть</button>
                {isUpdateUiOpen && <UpdateFormComponent index={index} updateType={"ski"}/>}
            </td>
            <td>
                <button className={styles.deleteButton} onClick={() => handleDeleteSkiClick(ski.id)}>X</button>
            </td>
        </tr>
    }

    const TableRowSkiPole: React.FC<{ skiPole: skiPoleType, index: number }> = ({skiPole, index}) => {
        const [isUpdateUiOpen, setUpdateUiOpen] = useState(false)

        return <tr key={skiPole.id + '/' + skiPole.name}>
            <th>{skiPole.id}</th>
            <td>{skiPole.name}</td>
            <td>Палка</td>
            <td>{skiPole.poleImg}</td>
            <td>
                <button onClick={() => setUpdateUiOpen(!isUpdateUiOpen)}>Открыть</button>
                {isUpdateUiOpen && <UpdateFormComponent index={index} updateType={'skiPole'}/>}
            </td>
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
                <div>
                    <button className={styles.createNewButton} onClick={() => setCreateUiOpen(!isCreateUiOpen)}>Добавить
                        новое
                    </button>
                </div>
                <div className={styles.controlsAndTableContainer}>
                    <div className={styles.controlElements}>
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
                                <th>Путь до картинки</th>
                                <th>Свойства</th>
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