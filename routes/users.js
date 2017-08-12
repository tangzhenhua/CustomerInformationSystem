var router = require('koa-router')();
const userService = require("../service/userService.js")
router.prefix('/users');

router.get('/', function(ctx, next) {
	ctx.body = 'this is a users response!';
});

router.get('/isUse', async function(ctx, next) {
	const result = await userService.isUse(ctx.request.query)
	ctx.body = result
});

router.post('/login', async function(ctx, next) {
	// console.log(ctx.request.body)
	// const data = await userService.login(ctx.request.body)
	// console.log(data)
	console.log(ctx.session.username)
	ctx.session.username = "zhangsan"
	console.log(ctx.session)
	ctx.body = await userService.login(ctx.request.body)
});

router.post('/isLogin', async function(ctx, next) {
	// console.log(ctx.request.body)
	// const data = await userService.login(ctx.request.body)
	// console.log(data)
	console.log(ctx.session.username)
	if (ctx.session.username) {
		ctx.body = {
			isLogin: true
		}
	} else {
		ctx.body = {
			isLogin: false
		}
	}

});

router.post('/reg', async function(ctx, next) {
	ctx.body = await userService.reg(ctx.request.body)
});

module.exports = router;