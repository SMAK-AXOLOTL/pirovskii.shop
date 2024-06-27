import {createInstance} from "./api";
import {skiPoleType} from "../utils/types";


export const skiPolesApi = {
    async getViewAllSkiPoles() {
        return await createInstance().get("/rest/skiPoles").then(response =>
            response.data.map((x: any) => {
                return x.data
            }))
    },
    async getAllSkiPoles() {
        return await createInstance().get("/rest/skiPoles/allSkiPolesData").then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async getSkiPoleById(id: string) {
        return await createInstance().get(`/rest/skiPoles/${id}`).then(response => response.data.data)
    },
    async create(data: skiPoleType) {
        return await createInstance().post('/admin/dashboard/skiPole', {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await createInstance().delete(`/admin/dashboard/skiPole/${idArg}`).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: skiPoleType) {
        return await createInstance().put(`/admin/dashboard/skiPole/${idArg}`, {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    }
}