const UserRouter = require('./User');
const ListRouter = require('./List');

const Router = require("koa-router");
const TestRouter = new Router()

module.exports = function (app) {
    TestRouter.get("/test", ctx => {
        ctx.body = "Hello"
    })

    TestRouter.get("/", ctx => {
        ctx.redirect("/test")
    })
    app.use(TestRouter.routes())

    app.use(UserRouter.routes());
    app.use(ListRouter.routes());
}

