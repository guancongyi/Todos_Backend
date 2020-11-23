const Router = require("koa-router");
const UserController = require('../controllers/User')

let router = new Router();

router.get('/register', UserController.register)
router.get('/login', UserController.login)

module.exports = router;