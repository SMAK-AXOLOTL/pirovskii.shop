import {createInstance} from "./api";
import {accessoryType} from "../utils/types";


export const accessoriesApi = {
    async getViewAllAccessories() {
        return await createInstance().get("/rest/accessories").then(response =>
            response.data.map((x: any) => {
                return x.data
            }))
    },
    async getAllAccessories() {
        return await createInstance().get("/rest/accessories/allAccessoriesData").then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async getAccessoryById(id: string) {
        return await createInstance().get(`/rest/accessories/${id}`).then(response => response.data.data)
    },
    async create(data: accessoryType) {
        return await createInstance().post('/admin/dashboard/accessory', {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await createInstance().delete(`/admin/dashboard/accessory/${idArg}`).then(response => response.data.map((x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: accessoryType) {
        return await createInstance().put(`/admin/dashboard/accessory/${idArg}`, {data: data}).then(response => response.data.map((x: any) => {
            return x.data
        }))
    }
}