import axios from "axios";

//todo fix authentication
export const instance = axios.create({
    baseURL: "http://localhost:8083"
})