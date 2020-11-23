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
//     addList: async (list)=>{
//         let listTable = await client.db('todos').collection('lists');
//         let res = await listTable.insertOne(list);
//         return res.result.ok
//     }
// }