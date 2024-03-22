import {skiModelType} from "../utils/types";

export const api = {
    async getAllSkating() {
        const res = await fetch("http://localhost:3000/skis", {
            method: "get"
        });
        const data = await res.json();

        return data.filter(function (entry:skiModelType){
            return entry.skiType === 'SKATING'
        })
    },
    async getAllClassic() {
        const res = await fetch("http://localhost:3000/skis", {
            method: "get"
        });
        const data = await res.json();

        return data.filter(function (entry:skiModelType){
            return entry.skiType === 'classic'
        })
    },
    async getAllSkis() {
        const res = await fetch("http://localhost:3000/skis", {
            method: "get"
        });
        const data = await res.json();

        return data
    },
    async getAllSkiPoles() {
        const res = await fetch("http://localhost:3000/skipoles", {
            method: "get"
        });
        const data = await res.json();

        return data
    }
}



