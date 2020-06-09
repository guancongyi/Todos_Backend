const qs = require('qs')
const MongoClient = require('mongodb').MongoClient;
const { buildUser, buildList } = require('../template.js')
const uri = "mongodb+srv://guan:Apply2015!@cluster0-kldaq.mongodb.net/test?retryWrites=true&w=majority";

let client = new MongoClient(uri,{
    useUnifiedTopology: true,
    poolSize: 6,
});
client.connect(function(err, db){
    mongodb=client.db('todos');
})

module.exports = {
    getLists:async ctx => {
        let id = ctx.request.query['id'];

        ctx.body = await new Promise((resolve, reject) => {
            mongodb.collection('lists').findOne({ "_id": id }, function (err, doc) {
                // console.log(doc.lists);
                console.log(doc.length)
                resolve(doc);
            })
        })
    },
    getList: ctx => {

    },
    setList:async ctx => {
        let id = ctx.request.body['id'];
        let listId = ctx.request.body['list'];
        let data = ctx.request.body['data'];
        // console.log(id, listName, data, qs.parse(data))
        // console.log(Object.values(qs.parse(data)))
        let tasks = Object.values(qs.parse(data));

        // convert 'true' to real true
        tasks.forEach((task) => {
            task['done'] = (task['done'] === 'true')
        })

        ctx.body = await new Promise((resolve, reject) => {
            mongodb.collection('lists').findOne({ '_id': id }, function (err, doc) {
                doc.lists[listId].tasks = tasks;
                resolve(mongodb.collection('lists').updateOne({ '_id': id }, { $set: { "lists": doc.lists } }));
            });
        })
    },
    addList:async ctx => {
        let id = ctx.request.body['id'];
        let listName = ctx.request.body['listName'];
        let data = ctx.request.body['data'];
        let tasks = Object.values(qs.parse(data));
        console.log(tasks)

        // convert 'true' to real true
        tasks.forEach((task) => {
            task['done'] = (task['done'] === 'true')
        })

        ctx.body = await new Promise((resolve, reject) => {
            mongodb.collection('lists').findOne({ '_id': id }, function (err, doc) {
                resolve(mongodb.collection('lists').updateOne({ '_id': id }, { $push: { "lists": { "name": listName, "tasks": tasks } } }));
            });
        })
    }

}