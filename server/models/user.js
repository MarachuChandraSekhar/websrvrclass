const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db, isConnected, ObjectId } = require('./mongo');

const collection = db.db("gratitude").collection("users");
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

async function get(id){
    const user = await collection.findOne({ _id: new ObjectId(id) });
    if(!user){
        throw { statusCode: 404, message: 'User not found' };
    }
    return { ...user, password: undefined };
}

async function getByHandle(handle){
    const user = await collection.findOne({ handle });
    if(!user){
        throw { statusCode: 404, message: 'User not found' };
    }
    return { ...user, password: undefined };
}

async function remove(id){
    const user = await collection.findOneAndDelete({ _id: new ObjectId(id) });
    
    return { ...user.value , password: undefined};
}

async function update(id, newUser){

    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    
    newUser = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: newUser },
        { returnDocument: 'after' }
    );
    console.log(newUser);
    
    return { ...newUser, password: undefined};
}

async function login(email, password){
    const user = await collection.findOne({ email });
    if(!user){
        throw { statusCode: 404, message: 'User not found' };
    }
    if(!await bcrypt.compare(password, user.password)){
        throw { statusCode: 401, message: 'Invalid password' };
    }

    const data = { ...user, password: undefined };
    const token = jwt.sign( data, process.env.JWT_SECRET);

    return { ...data, token };

}

function fromToken(token){

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                reject(err);
            }else{
                resolve(decoded);
            }
        });
    });
}

function seed(){
    return collection.insertMany(list);
}



module.exports = {
    collection, 
    seed,
    getByHandle,
    async create(user) {
        user.id = ++hieghstId;

        if(!user.handle){
            throw { statusCode: 400, message: 'Handle is required' };
        }
        user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
        console.log(user);

        const result = await collection.insertOne(user);
        user = await get(result.insertedId);

        return { ...user, password: undefined};
    },
    remove,
    update,
    login,
    fromToken,
    async getList(){
        return (await collection.find().toArray()).map(x=> ({...x, password: undefined }) );
    }
}
module.exports.get = get;