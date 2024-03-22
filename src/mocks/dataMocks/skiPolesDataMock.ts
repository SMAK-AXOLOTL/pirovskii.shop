import supra_xImg from '../../media/Supra-X.png';
import supra_cImg from '../../media/long_skies.png';
import acadiaImg from "../../media/peltonen_acadia_classic.png";
import {skiPolesType} from "../../utils/types";

export const skiPolesDataMock:skiPolesType = [
    {
        id: 'palka1',
        name: 'palka1',
        poleImg: supra_xImg,
        lengthArray: [
            '160-180',
            '180-200'
        ]
    },
    {
        id: 'palka2',
        name: 'palka2',
        poleImg: supra_cImg,
        lengthArray: [
            '160-180'
        ]
    },
    {
        id: 'palka3',
        name: 'palka3',
        poleImg: acadiaImg,
        lengthArray: []
    },
    {
        id: 'palka4',
        name: 'palka4',
        poleImg: supra_xImg,
        lengthArray: [
            '160-180',
            '180-200',
            '180-200',
            '180-200',
        ]
    },
]