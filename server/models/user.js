let hieghstId = 3;
 const list = [
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

function get(id){
    return list.find(user => user.id === parseInt(id));
}

module.exports = {
    create(user) {
        user.id = ++hieghstId;

        list.push(user);
        return user;
    }
}

module.exports.list = list;
module.exports.get = get;