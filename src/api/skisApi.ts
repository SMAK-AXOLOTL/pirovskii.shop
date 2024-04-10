import {skiModel} from "../utils/types";
import {createInstance} from "./api";

export const skisApi = {
    async getAllSkis() {
        return await createInstance().get("/rest/skis").then(response => response.data.map((x: any) => {
            return x.data
        }))
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



