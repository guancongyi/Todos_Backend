const Router = require("koa-router");
const HomeController = require('../controllers/Home')

let router = new Router();

router.get('/', HomeController.home)

module.exports = router;