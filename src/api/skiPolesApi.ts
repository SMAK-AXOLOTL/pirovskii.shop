import {instance} from "./api";
import {skiPoleType} from "../utils/types";

export const skiPolesApi = {
    async getAllSkiPoles() {
        return await instance.get("/rest/skiPoles").then(response => response.data.map( (x:any) => {
            return x.data
        } ))
    },
    async create(data: skiPoleType){
        return await instance.post('admin/dashboard/skiPole', {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await instance.delete(`/admin/dashboard/skiPole/${idArg}`).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: skiPoleType) {
        return await instance.put(`/admin/dashboard/skiPole/${idArg}`, {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    }
}