const Router = require("koa-router");
const ListController = require('../controllers/List')

let router = new Router({
    prefix:'/list'
});

router.get('/getLists', ListController.getLists)
router.get('/getList', ListController.getList)
router.post('/setList', ListController.setList)

module.exports = router;