import {skiModel} from "../utils/types";
import {instance} from "./api";

export const skisApi = {
    async getAllSkating() {
        const res = await instance.get("/rest/skis").then(response => response.data.map( (x:any) => {
            return x.data
        } ))

        return await res.filter(function (entry: skiModel) {
            return entry.type === 'skating'
        })
    },
    async getAllClassic() {
        const res = await instance.get("/rest/skis").then(response => response.data.map( (x:any) => {
            return x.data
        } ))

        return await res.filter(function (entry: skiModel) {
            return entry.type === 'classic'
        })
    },
    async getAllSkis() {
        return await instance.get("/rest/skis").then(response => response.data.map( (x:any) => {
            return x.data
        } ))
    },
    async create(data: skiModel){
        return await instance.post('admin/dashboard/ski', {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await instance.delete(`/admin/dashboard/ski/${idArg}`).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: skiModel) {
        return await instance.put(`/admin/dashboard/ski/${idArg}`, {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    }
}



