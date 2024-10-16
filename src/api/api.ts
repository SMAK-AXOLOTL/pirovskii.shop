import axios from "axios";
import inMemoryJWT from "../security/inMemoryJWT";

const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_HTTP : process.env.REACT_APP_HTTPS
export function createInstance(){
    if (!inMemoryJWT.getToken()){
        return axios.create({baseURL: baseUrl})
    } else return axios.create({
        baseURL: baseUrl,
        headers: {Authorization: `Bearer ${inMemoryJWT.getToken()}`}
    })
}