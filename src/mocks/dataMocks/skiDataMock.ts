import supra_xImg from '../../media/Supra-X.png';
import supra_cImg from '../../media/long_skies.png';
import {skiTypeEnum} from "../../utils/skiTypeEnum";
import acadiaImg from "../../media/peltonen_acadia_classic.png";
import {skiType} from "../../utils/types";

export const skiDataMock:skiType = [
        {
            id: 'supra_x',
            type: skiTypeEnum.CLASSIC,
            name: 'Supra X',
            skiImg: supra_xImg,
            hardTrack: [
                {
                    lengthString: '181',
                    weights: [
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
            type: skiTypeEnum.CLASSIC,
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
                        },
                        {
                            weightString: '85-90',
                            isReserved: true
                        },
                        {
                            weightString: '90-95',
                            isReserved: false
                        }
                    ]
                },
            ]
        },
        {
            id: 'supra_x',
            type: skiTypeEnum.SKATING,
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
            type: skiTypeEnum.SKATING,
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
            type: skiTypeEnum.SKATING,
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