import {skiModel} from "../utils/types";
import {createInstance} from "./api";


export const skisApi = {
    async getViewAllSkis() {
        return await createInstance().get("/rest/skis").then(response =>
            response.data.map((x: any) => {
                return x.data
            }))
    },
    async getAllSkisData() {
        return await createInstance().get("/rest/skis/allSkisData").then(response =>
            response.data.map((x: any) => {
                return x.data
            }))
    },
    async getSkiById(id: string) {
        return await createInstance().get(`/rest/skis/${id}`).then(response => response.data.data)
    },
    async create(data: skiModel) {
        return await createInstance().post('/admin/dashboard/ski', {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await createInstance().delete(`/admin/dashboard/ski/${idArg}`).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: skiModel) {
        return await createInstance().put(`/admin/dashboard/ski/${idArg}`, {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    }
}



