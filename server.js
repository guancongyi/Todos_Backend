const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const { buildUser, buildList } = require('./payload.js')

let app = new Koa();
let router = new Router();


app.use(koaBody({
    multipart: true,
}))

const uri = "mongodb+srv://guan:Apply2015!@cluster0-kldaq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

router.get("/test", ctx=>{
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(1)
    ctx.body = "Hello"
})
router.get("/", ctx => {
    ctx.redirect("/index")
})

router.post("/register", async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // console.log(ctx.request.body)

    let id = ctx.request.body['id'];
    let pwd = ctx.request.body['password'];
    let email = ctx.request.body['email'];
    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    ctx.body = await new Promise((resolve, reject) => {
        client.connect(function (err, client, status) {
            let usrTbl = client.db('todos').collection('users');
            let listsTbl = client.db('todos').collection('lists');
            usrTbl.findOne({ "_id": id }, function (err, doc) {
                if (doc == null) {
                    usrTbl.insertOne(buildUser(id, hash, id, false, email), (err, result) => {
                        if (result.result.ok) {
                            let emptyList = buildList();
                            listsTbl.insertOne({ "_id": id, "lists": [emptyList] });
                            resolve('ok');
                        }
                        else resolve("wrong")
                    })
                } else {
                    resolve('exist')
                }
            })
        })
    })
})

router.post("/login", async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // ctx.set('Content-Type', 'multipart/form-data')
    // console.log(ctx.request.body)
    console.log(1)
    let isGoogle = (ctx.request.body['isGoogle'] === 'true');
    if (isGoogle) {
        let id = ctx.request.body['id'];
        let name = ctx.request.body['name'];
        let email = ctx.request.body['email'];

        console.log(name)
        ctx.body = await new Promise((resolve, reject) => {
            client.connect(function (err, client) {
                let usrTbl = client.db('todos').collection('users');
                let listsTbl = client.db('todos').collection('lists');
                usrTbl.findOne({ "_id": id }, function (err, doc) {
                    if (doc == null) {
                        usrTbl.insertOne(buildUser(id, undefined, name, isGoogle, email), (err, result) => {
                            if (result.result.ok) {
                                let emptyList = buildList();
                                listsTbl.insertOne({ "_id": id, "lists": [emptyList] });
                                resolve('ok')
                            }
                            resolve("wrong")
                        })
                    } else {
                        resolve('exist')
                    }

                })

            });
        })
    } else {
        let id = ctx.request.body['id'];
        let pwd = ctx.request.body['password'];

        ctx.body = await new Promise((resolve, reject) => {
            client.connect(function (err, client) {
                let usrTbl = client.db('todos').collection('users');
                usrTbl.findOne({ "_id": id }, function (err, doc) {
                    bcrypt.compare(pwd, doc.password, function (err, res) {
                        if (res == true) {
                            resolve('ok')
                        } else {
                            client.close();
                            resolve("wrong")
                        }
                    })
                });
            });
        })
    }

})

router.get('/getLists', async ctx => {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    let id = ctx.request.query['id'];

    ctx.body = await new Promise((resolve, reject) => {
        client.connect(function (err, client, status) {
            let listsTbl = client.db('todos').collection('lists');
            listsTbl.findOne({ "_id": id }, function (err, doc) {
                console.log(doc);
                resolve(doc);
            })

        });

    })
})



app.use(router.routes());
app.listen(8787)