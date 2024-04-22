import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {clearAppError, selectAppErrorMessage, selectAppStatus, selectIsAuth, tryLogin} from "../../redux/appStateSlice";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";
import styles from './LoginFormComponent.module.css'

export function LoginComponent() {
    const isAuth = useAppSelector(selectIsAuth)
    const authStatus = useAppSelector(selectAppStatus)
    const errorMessage = useAppSelector(selectAppErrorMessage)
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    if (isAuth) return <Navigate to={'/dashboard'}/>

    function handleSubmit(userLogin: string, userPassword: string) {
        const userData = {login: userLogin, password: userPassword}
        setPassword('')
        dispatch(clearAppError())
        dispatch(tryLogin(userData))
    }

    function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLogin(e.target.value)
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function loginButtonTextSetter(){
        switch (authStatus){
            case "loading": return "Загрузка";
            default: return "Войти";
        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.loginForm}>
            <div>
                <label>
                    Login
                    <div>
                        <input disabled={authStatus === 'loading'} onChange={handleLoginChange} value={login}></input>
                    </div>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <div>
                        <input disabled={authStatus === 'loading'} type={"password"} onChange={handlePasswordChange} value={password}></input>
                    </div>
                </label>
            </div>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <button disabled={authStatus === 'loading'}
                    onClick={() => handleSubmit(login, password)}
                    className={styles.loginButton}>
                {loginButtonTextSetter()}
            </button>
        </div>
    </div>
}