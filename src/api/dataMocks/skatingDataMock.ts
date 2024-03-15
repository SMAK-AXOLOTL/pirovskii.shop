import supra_xImg from '../../media/Supra-X.png';
import supra_cImg from '../../media/long_skies.png';
import acadiaImg from '../../media/peltonen_acadia_classic.png';

export const skatingDataMock = {
    models: [
        {
            id: 'supra_x',
            name: 'Super Supra',
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
            id: 'supra_c',
            name: 'Supra Cheap',
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
            id: 'acadia',
            name: 'Macadamia',
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