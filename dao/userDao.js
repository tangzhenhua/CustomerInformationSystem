const database = require("./database.js")

module.exports.login = async(queryTerms) => {
	return await database.query({
		modelName: "user",
		queryTerms
	})
}

module.exports.reg = async(insertData) => {
	return await database.create({
		modelName: "user",
		insertData
	})
}

module.exports.isUse = async({
	username
}) => {
	return await database.query({
		modelName: "user",
		queryTerms: {
			username
		}
	})
}