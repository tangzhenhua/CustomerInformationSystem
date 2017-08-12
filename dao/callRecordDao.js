const database = require("./database.js")
module.exports.getCallRecordByPage = async({
	curPage,
	eachPage,
	customerId
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

	if(customerId) {
		params.queryTerms = {
			customerId
		}
	}
	return await database.query(params)
}