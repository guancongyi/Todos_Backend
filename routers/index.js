const HomeRouter = require('./Home');
const UserRouter = require('./User');
// const ListRouter = require('./List');

module.exports = function (app) {
    app.use(HomeRouter.routes());
    app.use(UserRouter.routes());
    // app.use(ListRouter.routes());
}

