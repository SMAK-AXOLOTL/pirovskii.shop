import {skatingDataMock} from "./dataMocks/skatingDataMock";
import {classicDataMock} from "./dataMocks/classicDataMock";

export const skisApi = {
    getAllSkating() {
        return skatingDataMock
    },
    getAllClassic() {
        return classicDataMock
    }
}



