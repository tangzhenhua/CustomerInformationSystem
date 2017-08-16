const router = require('koa-router')();
const path = require('path')
const database = require("../dao/database.js")
const {
	uploadFile
} = require('../util/upload')
const xlsx = require('node-xlsx');
const fs = require('fs');
const moment = require("moment")

router.prefix('/files');

// 解析客户信息
async function xlsxToJsonCustomer(data) {
	const customers = []
	const m = new Map()
	for (let i = 1; i < data.length; i++) {
		m.set(data[i][1], {
			name: data[i][2],
			// 资金账户号
			capital_account: data[i][1],
			// 手机号码
			phone: data[i][3]
		})
	}
	for(let [key, value] of m.entries()) {
		customers.push(value)
	}
	const result = await database.create({
		modelName: "customer",
		insertData: customers
	})
	console.log("解析客户信息成功")
}	

// 解析客户沟通信息
async function xlsxToJsonCallRecords(data) {
	for (let i = 1; i < data.length; i++) {
		const time = moment(data[i][0], "YYYYMMDD")
		const customerSituation = data[i][5]
		const communicationSituation = data[i][4]
		const result = await database.query({
			modelName: "customer",
			queryTerms: {
				capital_account: data[i][1]
			}
		})
		const customerId = result.data[0]._id
		const s = await database.create({
			modelName: "callRecord",
			insertData: {
				customerId,
				// 客户情况
				customerSituation,
				// 沟通情况
				communicationSituation,
				// 联系时间
				relationTime: time
			}
		})
		console.log("解析客户沟通信息成功")
	}
}

router.post('/upload', async function(ctx, next) {
	let result = {
			success: false
		}
		// 上传文件事件
	result = await uploadFile(ctx, {
		//目录
		fileType: 'movies',
		//路径
		path: "routes",
	})
	console.log(result)
	if(result.success) {
		await database.del({modelName: "customer", queryTerms: {}})
		await database.del({modelName: "callRecord", queryTerms: {}})
		const obj = xlsx.parse(__dirname + "/" +result.data.fileName);
		await xlsxToJsonCustomer(obj[0].data)
		await xlsxToJsonCallRecords(obj[0].data)
		ctx.body = {ok: 1}
	} else {
		ctx.body = {ok: 0}
	}
	// result.data = await addImg(result.data)
	// console.log(result.data)
	// await update(result.data)
});

module.exports = router;