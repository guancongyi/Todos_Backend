const Router = require("koa-router");
const UserController = require('../controllers/User')

let router = new Router({
    prefix:'/user'
});

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router;