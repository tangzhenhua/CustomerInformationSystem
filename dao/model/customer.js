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
	// 客户状态 0:表示普通客户 1:表示重点客户
	status: {
		type: String,
		default: "0"
	}
})

mongoose.model("customer", customerSchema, "customers")