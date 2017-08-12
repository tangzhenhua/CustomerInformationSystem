const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
//引入 session 功能
const session = require("koa-session-minimal")
const cors = require('koa-cors');

require("./dao/database.js")

const index = require('./routes/index');
const users = require('./routes/users');
const customer = require('./routes/customer');
const callRecord = require('./routes/callRecord');

// error handler
onerror(app);

// middlewares
app.use(cors());
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(session({
	key: "tangzhenhua", //default "koa:sess"
	cookie: {
		maxAge: "50000"
	}
}))

app.use(views(__dirname + '/views', {
	extension: 'jade'
}));

// logger
app.use(async(ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(customer.routes(), customer.allowedMethods());
app.use(callRecord.routes(), callRecord.allowedMethods());

var server = app.listen(3001, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});