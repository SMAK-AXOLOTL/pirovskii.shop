import inMemoryJWT from "../security/inMemoryJWT";
import axios from "axios";

export const authApi = {
    async login(login: string, password: string) {
        return await axios.post('http://localhost:8083/admin/dashboard/login',
            {data: {login: login, password: password}})
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    if (response.status === 403) return "Неправильные данные"
                }
                inMemoryJWT.setToken(response.data.accessToken, response.data.refreshToken, 3600)
            })
    },
    async logOut() {
        return await axios.delete('http://localhost:8083/admin/dashboard/logout').then(response => {
            if (response.status < 200 || response.status >= 300) {
                inMemoryJWT.eraseToken()
                throw new Error("Logout unsuccessful")
            }
            inMemoryJWT.eraseToken()
        })
    },
    async refresh(token: string) {
        return await axios.post(
            'http://localhost:8083/admin/dashboard/refresh',
            {token: token}
        ).then(response => {
            if (response.status < 200 || response.status >= 300) {
                inMemoryJWT.eraseToken()
                throw new Error("Server side error")
            }
            return response.data
        }).then(data => {
            if (data) {
                inMemoryJWT.setToken(data.accessToken, data.refreshToken, 3600)
            } else throw new Error("Token did not refresh")
        })
    }
}