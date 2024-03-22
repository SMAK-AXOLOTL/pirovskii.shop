import supra_xImg from '../../media/Supra-X.png';
import supra_cImg from '../../media/long_skies.png';
import acadiaImg from "../../media/peltonen_acadia_classic.png";
import {skiPolesType} from "../../utils/types";

export const skiPolesDataMock:skiPolesType = [
    {
        id: 'palka1',
        name: 'Super Palka',
        poleImg: supra_xImg,
        lengthArray: [
            '160-180',
            '180-200'
        ]
    },
    {
        id: 'palka2',
        name: 'Prosto Odna Palka',
        poleImg: supra_cImg,
        lengthArray: [
            '160-180'
        ]
    },
    {
        id: 'palka3',
        name: 'Netu palki',
        poleImg: acadiaImg,
        lengthArray: []
    },
    {
        id: 'palka4',
        name: 'Palok mnogo',
        poleImg: supra_xImg,
        lengthArray: [
            '160-180',
            '180-200',
            '180-200',
            '180-200',
            '160-180',
            '180-200',
            '180-200',
            '180-200',
            '160-180',
            '180-200',
            '180-200',
            '180-200',
        ]
    },
]