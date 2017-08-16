const database = require("./database.js")

module.exports.getCustomerByPage = async(page) => {
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
		if(key !== "_id") {
			obj.queryTerms[key] = eval(`/${page[key]}/`)
		} else {
			obj.queryTerms[key] = page[key]
		}
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

module.exports.updateCustomer = async({
	_id, name, capital_account, phone, status
}) => {
	return await database.update({
		modelName: "customer",
		queryTerms: {_id},
		updateData: {name, capital_account, phone, status}
	})
}

module.exports.delCustomerById = async({
	_id
}) => {
	const data = await database.del({
		modelName: "customer",
		queryTerms: {
			_id
		}
	})
	return data.result
}


module.exports.delAll = async() => {
	
}


