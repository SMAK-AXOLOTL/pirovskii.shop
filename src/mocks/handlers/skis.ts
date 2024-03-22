import {http, HttpResponse} from "msw";
import {skiDataMock} from "../dataMocks/skiDataMock";

export const getSkiData = http.get("http://localhost:3000/skis", () => {
    return HttpResponse.json(skiDataMock)
});
