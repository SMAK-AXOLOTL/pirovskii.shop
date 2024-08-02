import axios from "axios";
import inMemoryJWT from "../security/inMemoryJWT";

export function createInstance(){
    if (!inMemoryJWT.getToken()){
        return axios.create({baseURL: "http://localhost:8080"})
    } else return axios.create({
        baseURL: "http://localhost:8080",
        headers: {Authorization: `Bearer ${inMemoryJWT.getToken()}`}
    })
}