export interface User {
    firstName: string;
    lastName: string;
    handle: string;
    password: string;
    email: string;
    pic: string;
    id: number;
}
export const list: User[]= [
    {
        firstName: 'Chandra Sekhar',
        lastName: 'Marachu',
        handle: 'ChandraSekharMarachu',
        password: 'mcs',
        email: 'chandra@cs.com',
        pic: 'https://randomuser.me/api/potraits/men/3.jpg',
        id: 1,
    },
    {
        firstName: 'Chandra ',
        lastName: 'Marachu',
        handle: 'ChandraMarachu',
        password: 'mc',
        email: 'chandra@c.com',
        pic: 'https://randomuser.me/api/potraits/men/5.jpg',
        id: 1,
    },
    {
        firstName: 'Sekhar',
        lastName: 'Marachu',
        handle: 'SekharMarachu',
        password: 'ms',
        email: 'Sekhar@s.com',
        pic: 'https://randomuser.me/api/potraits/men/7.jpg',
        id: 1,
    },
];