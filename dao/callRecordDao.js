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
			relationTime: -1
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
	console.log(params)
	return await database.query(params)
}