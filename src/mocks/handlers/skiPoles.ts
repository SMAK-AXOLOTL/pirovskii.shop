import {http, HttpResponse} from "msw";
import {skiDataMock} from "../dataMocks/skiDataMock";
import {skiPolesDataMock} from "../dataMocks/skiPolesDataMock";

export const getSkiPolesData = http.get("http://localhost:3000/skipoles", ({}) => {
    return HttpResponse.json(skiPolesDataMock)
});