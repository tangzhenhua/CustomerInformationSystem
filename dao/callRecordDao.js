const database = require("./database.js")
module.exports.getCallRecordByPage = async({
	curPage,
	eachPage,
	customerId
}) => {
	return await database.query({
		modelName: "callRecord",
		curPage,
		eachPage,
		queryTerms: {
			customerId
		},
		sort: {
			relationTime: -1
		},
		populate: [{
			path: "customerId",
		}]
	})
}