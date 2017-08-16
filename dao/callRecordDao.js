const moment = require("moment")
const database = require("./database.js")

module.exports.getCallRecordByPage = async({
	curPage,
	eachPage,
	customerId,
	relationTime
}) => {
	const params = {
		modelName: "callRecord",
		curPage,
		eachPage,
		sort: {
			relationTime: -1,
			_id: -1
		},
		populate: [{
			path: "customerId",
		}]
	}
	params.queryTerms = {}
	if(customerId) {
		params.queryTerms["customerId"] = customerId
	}
	if(relationTime) {
		params.queryTerms["relationTime"] = moment(relationTime, "YYYYMMDD")
	}
	return await database.query(params)
}

module.exports.addCallRecord = async (callRecord) => {
	callRecord.relationTime = moment(callRecord.relationTime, "YYYYMMDD")
	return await database.create({
		modelName: "callRecord",
		insertData: callRecord
	})
}

module.exports.removeCallRecord = async (callRecord) => {
	return await database.del({
		modelName: "callRecord",
		queryTerms: callRecord
	})
}

module.exports.getCallRecordById = async (callRecord) => {
	return await database.query({
		modelName: "callRecord",
		queryTerms: callRecord,
		populate: [{
			path: "customerId",
		}]
	})
}

module.exports.updateCallRecordById = async ({
	_id,
  relationTime,
  customerSituation,
  communicationSituation
}) => {
	return await database.update({
		modelName: "callRecord",
		queryTerms: {
			_id
		},
		updateData: {
			relationTime,
		  customerSituation,
		  communicationSituation
		}
	})
}