const router = require('koa-router')();
const path = require('path')
const {
	addImg
} = require("../service/imgService.js")
const {
	update
} = require("../service/movieSerivce.js")
const {
	uploadFile
} = require('../util/upload')

router.prefix('/files');

router.post('/upload', async function(ctx, next) {
	let result = {
			success: false
		}
		// 上传文件事件
	result = await uploadFile(ctx, {
		//目录
		fileType: 'movies',
		//路径
		path: "./public/images/",
	})
	result.data = await addImg(result.data)
	console.log(result.data)
	await update(result.data)
	ctx.body = result
});

module.exports = router;