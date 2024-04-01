import axios from "axios";
import inMemoryJWT from "../security/inMemoryJWT";

export function createInstance(){
    if (!inMemoryJWT.getToken()){
        throw new Error("Couldn't create new instance - No access token")
    }
    return axios.create({
        baseURL: "http://localhost:8083",
        headers: {Authorization: `Bearer ${inMemoryJWT.getToken()}`}
    })
}