import {createInstance} from "./api";
import {skiPoleType} from "../utils/types";
import {skiPolesData} from "../dataMocks/skiPolesDataMocks";

export const skiPolesApi = {
    async getAllSkiPoles() {
        return process.env.NODE_ENV === "production" ? skiPolesData : await createInstance().get("/rest/skiPoles").then(response => response.data.map( (x:any) => {
            return x.data
        } ))
    },
    async create(data: skiPoleType){
        return await createInstance().post('/admin/dashboard/skiPole', {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async deleteOne(idArg: string) {
        return await createInstance().delete(`/admin/dashboard/skiPole/${idArg}`).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    },
    async updateOne(idArg: string, data: skiPoleType) {
        return await createInstance().put(`/admin/dashboard/skiPole/${idArg}`, {data: data}).then(response => response.data.map( (x: any) => {
            return x.data
        }))
    }
}