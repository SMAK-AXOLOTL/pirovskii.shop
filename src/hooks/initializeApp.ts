import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {getViewAllSkisData, selectSkis, selectSkiStatus} from "../redux/skisSlice";
import {useEffect} from "react";
import {getViewAllSkiPolesData, selectSkiPoles, selectSkiPolesStatus} from "../redux/skiPolesSlice";

export function InitializeApp(){
    const dispatch = useAppDispatch()

    const skiStatus = useAppSelector(selectSkiStatus)
    const allSkis = useAppSelector(selectSkis)
    
    const skiPoleStatus = useAppSelector(selectSkiPolesStatus)
    const allSkiPoles = useAppSelector(selectSkiPoles)

    useEffect(() => {
        if (skiStatus === 'idle' && allSkis.length <= 0) {
            dispatch(getViewAllSkisData())
        }
        if (skiPoleStatus === 'idle' && allSkiPoles.length <= 0){
            dispatch(getViewAllSkiPolesData())
        }
    }, [allSkiPoles.length, allSkis.length, dispatch, skiPoleStatus, skiStatus])
}