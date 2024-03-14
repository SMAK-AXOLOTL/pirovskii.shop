import {skatingType} from "../utils/types";
import supra_xImg from '../media/Supra-X.png';
import supra_cImg from '../media/long_skies.png';
import acadiaImg from '../media/peltonen_acadia_classic.png';

export const skatingDataMock: skatingType = {
    models: [
        {
            name: 'Supra X',
            skiImg: supra_xImg,
            hardTrack: [
                {
                    lengthString: '181',
                    weights: [
                        {
                            weightString: '55-60',
                            isReserved: false
                        },
                        {
                            weightString: '65-70',
                            isReserved: false
                        },
                        {
                            weightString: '80-85',
                            isReserved: true
                        },
                        {
                            weightString: '85-90',
                            isReserved: false
                        },
                        {
                            weightString: '90-95',
                            isReserved: false
                        }
                    ]
                },
                {
                    lengthString: '188',
                    weights: [
                        {
                            weightString: '55-60',
                            isReserved: true
                        },
                        {
                            weightString: '80-85',
                            isReserved: false
                        }
                    ]
                },
                {
                    lengthString: '193',
                    weights: [
                        {
                            weightString: '90-95',
                            isReserved: false
                        }
                    ]
                },

            ],
            universalTrack: [
                {
                    lengthString: '176',
                    weights: [
                        {
                            weightString: '55-60',
                            isReserved: false
                        },
                        {
                            weightString: '60-65',
                            isReserved: true
                        }
                    ]
                }]
        },
        {
            name: 'Supra C',
            skiImg: supra_cImg,
            universalTrack: [
                {
                    lengthString: '176',
                    weights: [{
                        weightString: '55-60',
                        isReserved: false
                    },
                        {
                            weightString: '60-65',
                            isReserved: false
                        }
                    ]
                },
            ]
        },
        {
            name: 'Acadia',
            skiImg: acadiaImg,
            hardTrack: [
                {
                    lengthString: '176',
                    weights: [
                        {
                            weightString: '55-60',
                            isReserved: false
                        },
                        {
                            weightString: '60-65',
                            isReserved: false
                        }
                    ]
                },
            ]
        }
    ]
}