import {instance} from "./api";

export const authApi = {
    async login(login:string, password: string) {
        return await instance.post('admin/dashboard/login', {data: {login: login, password: password}}).then(response => response.data.accessToken)
    },
    async refresh() {
        const res = await fetch(
            'http://localhost:3000/admin/dashboard/refresh',
            {
                method: "post"
            });
        return await res.json()
    }
}