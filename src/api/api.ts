import axios from "axios";
import inMemoryJWT from "../security/inMemoryJWT";

export function createInstance(){
    if (!inMemoryJWT.getToken()){
        return axios.create({baseURL: "http://localhost:8083"})
    } else return axios.create({
        baseURL: "http://localhost:8083",
        headers: {Authorization: `Bearer ${inMemoryJWT.getToken()}`}
    })
}