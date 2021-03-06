/*
	客户基本信息
*/

var mongoose = require('mongoose');
var {
	Schema
} = mongoose;

var customerSchema = new Schema({
	// 客户姓名
	name: {
		type: String
	},
	// 资金账户号
	capital_account: {
		type: String
	},
	// 手机号码
	phone: {
		type: String
	},
	// 客户状态 普通客户 0, 重点客户 1，持续跟踪 2，放弃客户 3 
	status: {
		type: String,
		default: "0"
	}
})

mongoose.model("customer", customerSchema, "customers")