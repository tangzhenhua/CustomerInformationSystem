var router = require('koa-router')();
const customerService = require("../service/customerService.js")
router.prefix('/customer');

router.get('/', function(ctx, next) {
	ctx.body = 'this is a customer response!';
});

router.get('/getCustomerByPage',async function(ctx, next) {
	ctx.body = await customerService.getCustomerByPage(ctx.request.query)
});

router.post('/updateCustomerStatus',async function(ctx, next) {
	ctx.body = await customerService.updateCustomerStatus(ctx.request.body)
});

router.post('/insertCustomer',async function(ctx, next) {
	ctx.body = await customerService.insertCustomer(ctx.request.body)
});

module.exports = router;