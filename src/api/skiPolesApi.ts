import {instance} from "./api";

export const skiPolesApi = {
    async getAllSkiPoles() {
        return await instance.get("/rest/skipoles").then(response => response.data.map( (x:any) => {
            return x.data
        } ))
    }
}