var router = require('koa-router')();
const callRecordService = require("../service/callRecordService.js")
router.prefix('/callRecord');

router.get('/', function(ctx, next) {
	ctx.body = 'this is a customer response!';
});

router.get('/getCallRecordByPage',async function(ctx, next) {
	ctx.body = await callRecordService.getCallRecordByPage(ctx.request.query)
});

module.exports = router;