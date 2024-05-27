import styles from "../DashboardComponent.module.css";
import React, {SetStateAction} from "react";
import {filters} from "../../../enums/filtersEnum";

type PropsType = {
    setFilter: React.Dispatch<SetStateAction<filters>>
}

const TableFiltersComponent:React.FC<PropsType> = ({setFilter}) => {


    return <div className={styles.filtersElements}>
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
}

export default TableFiltersComponent