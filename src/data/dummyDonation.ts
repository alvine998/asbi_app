import { IDonation } from "../types/donation";

export const datas: IDonation[] = [
    {
        id: 1,
        title: 'Donasi 1',
        target: 5000,
        raised: 1000,
        thumbnail: require('../assets/images/logo.jpeg'),
    },
    {
        id: 2,
        title: 'Donasi 2',
        target: 3000,
        raised: 1000,
        thumbnail: require('../assets/images/logo.jpeg'),
    },
    {
        id: 3,
        title: 'Donasi 3',
        target: 10000,
        raised: 1000,
        thumbnail: require('../assets/images/logo.jpeg'),
    },
];