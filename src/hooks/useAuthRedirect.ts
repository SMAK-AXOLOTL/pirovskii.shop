import {useAppSelector} from "./reduxHooks";
import {selectIsAuth} from "../redux/appStateSlice";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthRedirect = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect( () => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate] )
}