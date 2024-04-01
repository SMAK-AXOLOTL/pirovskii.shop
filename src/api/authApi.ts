import inMemoryJWT from "../security/inMemoryJWT";
import axios from "axios";

export const authApi = {
    async login(login: string, password: string) {
        return await axios.post('http://localhost:8083/admin/dashboard/login',
            {data: {login: login, password: password}})
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText)
                }
                inMemoryJWT.setToken(response.data.accessToken, response.data.refreshToken, 3600)
            })
    },
    async logOut() {
        return await axios.delete('http://localhost:8083/admin/dashboard/logout').then(response => {
            if (response.data !== 'Success') {
                throw new Error("Logout unsuccessful")
            }
            inMemoryJWT.eraseToken()
        })
    },
    async checkAuth() {
        if (!inMemoryJWT.getToken()){
            return this.refresh().then(tokenHasBeenRefreshed => {
                return tokenHasBeenRefreshed ? Promise.resolve() : Promise.reject()
            })
        } else {
            return Promise.resolve()
        }
    },
    async refresh() {
        return await axios.post(
            'http://localhost:8083/admin/dashboard/refresh'
        ).then(response => {
            if (response.status < 200 || response.status >= 300) {
                inMemoryJWT.eraseToken()
                return {data: null}
            }
            return response.data
        }).then(({data}) => {
            if (data) {
                inMemoryJWT.setToken(data.accessToken, data.refreshToken, 3600)
                return true
            }
            return false
        })
    }
}