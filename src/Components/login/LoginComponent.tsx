import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {tryLogin, selectIsAuth} from "../../redux/appStateSlice";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";
import styles from './LoginFormComponent.module.css'


//todo: loading/error indication
export function LoginComponent() {
    const isAuth = useAppSelector(selectIsAuth)
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    if (isAuth) return <Navigate to={'/dashboard'}/>

    function handleSubmit(userLogin: string, userPassword: string) {
        const userData = {login: userLogin, password:userPassword}
        dispatch(tryLogin(userData))
    }

    function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>){
        setLogin(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
    }

    return <div className={styles.wrapper}>
        Login Form
        <div className={styles.loginForm}>
            <div>
                <label>
                    Login
                    <div>
                        <input onChange={handleLoginChange} value={login}></input>
                    </div>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <div>
                        <input type={"password"} onChange={handlePasswordChange} value={password}></input>
                    </div>
                </label>
            </div>
            <button onClick={() => handleSubmit(login, password)}>Login</button>
        </div>
    </div>
}