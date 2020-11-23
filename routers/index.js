const UserRouter = require('./User');
// const ListRouter = require('./List');

module.exports = function (app) {
    app.use(UserRouter.routes());
    // app.use(ListRouter.routes());
}

