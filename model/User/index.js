const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    lists: {
        type: Array,
    }
});

const UserModel = mongoose.model('User', userSchema)
module.exports = {
    UserModel: UserModel
}

// const bcrypt = require('bcrypt');
// const MongoClient = require('mongodb').MongoClient;
// const url = require('../../configs/configs').database.url;

// let client = new MongoClient(url, {
//     useUnifiedTopology: true,
//     poolSize: 6,
// });
// client.connect(function (err, db) {
//     mongodb = client.db('todos');
// })

// module.exports = {
//     addUser: async (user) => {
//         user.password = await bcrypt.hash(user.password, 10);
//         let userTable = await client.db('todos').collection('users');
//         let res = await userTable.insertOne(user);
//         return res.result.ok

//     },
//     findUser: async (_id) => {
//         let userTable = await client.db('todos').collection('users');
//         let res = await userTable.findOne({ '_id': _id });
//         return !(res == null)
//     },
//     passwordMatch: async(_id, password)=>{
//         let userTable = await client.db('todos').collection('users');
//         let doc = await userTable.findOne({ '_id': _id });
//         let res = await bcrypt.compare(password, doc.password);
//         return res == true
//     }
// }