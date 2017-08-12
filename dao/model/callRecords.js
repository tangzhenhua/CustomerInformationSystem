/*
	沟通记录表
*/

var mongoose = require('mongoose');
var moment = require('moment');
var {
	Schema
} = mongoose;

var callRecordsSchema = new Schema({
	// 客户id
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'customer'
	},
	// 客户情况
	customerSituation: {
		type: String
	},
	// 沟通情况
	communicationSituation: {
		type: String
	},
	// 联系时间
	relationTime: {
		type: Date
	}
})

callRecordsSchema.virtual('relation_time').get(function() {
	return moment(this.relationTime).format('YYYY-MM-DD');
});

callRecordsSchema.set('toJSON', {
	getters: true,
	virtual: true
});

mongoose.model("callRecord", callRecordsSchema, "callRecords")