var xlsx = require('node-xlsx');
var fs = require('fs');
var database = require("../dao/database.js")
const moment = require("moment")
var obj = xlsx.parse(__dirname+'/客户沟通情况表.xlsx');

// xlsxToJsonCallRecords(obj[0].data)
// xlsxToJsonCustomer(obj[0].data)

getCallRecords()
// 获取客户沟通信息
async function getCallRecords() {
	const {data} = await database.query({
		modelName: "callRecord",
		populate: [{
			path: "customerId",
		}]
	})
	console.log(data[0].relation_time)
}

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
		console.log(s)
	}
}

function formatterTime(time) {
	console.log()
}


