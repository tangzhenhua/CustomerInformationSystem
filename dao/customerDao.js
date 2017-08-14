const database = require("./database.js")

module.exports.getCustomerByPage = async(page) => {
	// 查询参数
	const {
		curPage,
		eachPage
	} = page
	const obj = {
		modelName: "customer",
		curPage,
		eachPage
	}
	delete page.curPage;
	delete page.eachPage;
	for(let key in page) {
		obj.queryTerms = {}
		obj.queryTerms[key] = eval(`/${page[key]}/`)
	}
	return await database.query(obj)
}

module.exports.updateCustomerStatus = async(queryTerms) => {
	try {
		const {
			data
		} = await database.query({
			modelName: "customer",
			queryTerms,
		})
		const status = data[0].status
		return await database.update({
			modelName: "customer",
			queryTerms,
			updateData: {
				status: status == 0 ? 1 : 0
			}
		})
	} catch (e) {
		console.log(e)
	}
}


module.exports.insertCustomer = async(insertData) => {
	return await database.create({
		modelName: "customer",
		insertData
	})
}



