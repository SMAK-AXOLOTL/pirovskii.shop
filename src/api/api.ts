import axios from "axios";
import inMemoryJWT from "../security/inMemoryJWT";

export function createInstance(){
    if (!inMemoryJWT.getToken()){
        return axios.create({baseURL: "https://localhost:443"})
    } else return axios.create({
        baseURL: "https://localhost:443",
        headers: {Authorization: `Bearer ${inMemoryJWT.getToken()}`}
    })
}