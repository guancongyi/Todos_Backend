const md5 = require('md5');
let UserModel = require('../../model/User').UserModel;

module.exports = {
    login: async ctx => {
        const {username, password } = ctx.request.query
        const hashed = md5(password);
        const user = await UserModel.findOne({ "username": username , 'password': hashed});

        if (user === null){
            ctx.status = 400;
            ctx.body = 'User not Found';
        }else{
            ctx.status = 200;
            ctx.body = user;
        }
    },

    register: async ctx => {
        const { username, password, rePassword, email } = ctx.request.query;

        if (password !== rePassword) {
            ctx.status = 400;
            ctx.body = 'Passwords are not same ';
        }else{
            const hashed = md5(password);
            const user = await UserModel.findOne({ "username": username });

            if (user !== null) {
                ctx.status = 400;
                ctx.body = 'User already existed ';
            }else{
                const newUser = new UserModel({
                    "username": username,
                    "password": hashed,
                    "email": email
                })
                newUser.save();
                ctx.status = 200;
                ctx.body = 'Registered successfully! ';
            }
        }
    }
}

// const MongoClient = require('mongodb').MongoClient;
// const { buildUser, buildList, buildUserList } = require('../template.js')
// const uri = "mongodb+srv://guan:Apply2015!@cluster0-kldaq.mongodb.net/test?retryWrites=true&w=majority";
// const userModel = require('../../model/User');
// const listModel = require('../../model/List');


// let client = new MongoClient(uri, {
//     useUnifiedTopology: true,
//     poolSize: 6,
// });
// client.connect(function (err, db) {
//     mongodb = client.db('todos');
// })

// module.exports = {
//     glogin: async ctx => {
//         let id = ctx.request.body['id'];
//         let name = ctx.request.body['name'];
//         let email = ctx.request.body['email'];

//         ctx.body = await new Promise((resolve, reject) => {
//             client.connect(function (err, client) {
//                 let usrTbl = client.db('todos').collection('users');
//                 let listsTbl = client.db('todos').collection('lists');
//                 usrTbl.findOne({ "_id": id }, function (err, doc) {
//                     if (doc == null) {
//                         usrTbl.insertOne(buildUser(id, undefined, name, isGoogle, email), (err, result) => {
//                             if (result.result.ok) {
//                                 let emptyList = buildList();
//                                 listsTbl.insertOne({ "_id": id, "lists": [emptyList] });
//                                 resolve('ok')
//                             }
//                             resolve("wrong")
//                         })
//                     } else {
//                         resolve('exist')
//                     }

//                 })

//             });
//         })
//     },
//     login: async ctx => {
//         let _id = ctx.request.body['_id'];
//         let pwd = ctx.request.body['password'];
//         let found = await userModel.findUser(_id);
//         if (!found){
//             ctx.status = 400;
//             ctx.body = 'User does not exist';
//         }else{
//             let match = await userModel.passwordMatch(_id, pwd);
//             if (match){
//                 ctx.status = 200;
//                 ctx.body = 'login successful';
//             }else{
//                 ctx.status = 400;
//                 ctx.body = 'password does not match';
//             }
//         }
//     },
//     register: async ctx => {
//         let user = buildUser(ctx.request.body);
//         let list = buildUserList({"_id":user._id});

//         if (ctx.request.body['rePassword'] !== user.password) {
//             ctx.status = 400;
//             ctx.body = 'Password are not the same';
//         } else {
//             let found = await userModel.findUser(user._id);
//             if (!found){
//                 let userAdded = await userModel.addUser(user);
//                 let listAdded = await listModel.addList(list);

//                 console.log('user added: '+userAdded);
//                 console.log('empty list added: '+listAdded);

//                 ctx.body = 'Added: '+ (userAdded&&listAdded);
//             }else{
//                 ctx.status = 400;
//                 ctx.body = 'User exists'
//             }
//         }

//     }
// }