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

