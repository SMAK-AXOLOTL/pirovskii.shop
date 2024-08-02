import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {getViewAllSkisData, selectSkis, selectSkiStatus} from "../redux/skisSlice";
import {useEffect} from "react";
import {getViewAllSkiPolesData, selectSkiPoles, selectSkiPolesStatus} from "../redux/skiPolesSlice";
import {getViewAllAccessoriesData, selectAccessories, selectAccessoriesStatus} from "../redux/accessoriesSlice";

export function InitializeApp(){
    const dispatch = useAppDispatch()

    const skiStatus = useAppSelector(selectSkiStatus)
    const allSkis = useAppSelector(selectSkis)
    
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const allSkiPoles = useAppSelector(selectSkiPoles)

    const accessoriesStatus = useAppSelector(selectAccessoriesStatus)
    const allAccessories = useAppSelector(selectAccessories)
    useEffect(() => {
        if (skiStatus === 'idle' && allSkis.length <= 0) {
            dispatch(getViewAllSkisData())
        }
        if (skiPoleStatus === 'idle' && allSkiPoles.length <= 0){
            dispatch(getViewAllSkiPolesData())
        }
        if(accessoriesStatus === 'idle' && allAccessories.length <= 0) {
            dispatch(getViewAllAccessoriesData())
        }
    }, [accessoriesStatus, allAccessories.length, allSkiPoles.length, allSkis.length, dispatch, skiPoleStatus, skiStatus])
}