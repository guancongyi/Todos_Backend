const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('./routers');
const mongoose = require('mongoose')
const cors = require('@koa/cors');

let app = new Koa();
app.use(cors());
app.use(koaBody({
    multipart: true,
    json: true
}))

mongoose.connect('mongodb://mongo:27017/to_dos', { useNewUrlParser: true })
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('connected to database successfully!!!');
})

Router(app);
app.listen(8888);