require("./model/userModel.js")
require("./model/customer.js")
require("./model/callRecords.js")

var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/cis';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

/**
 * [description]
 * @param  {[type]}   options.modelName  [description]  model 名称
 * @param  {[type]}   options.queryTerms [description]  查询条件
 * @param  {Object}   options.sort       [description]  排序方式 1 为升序 -1 为降序
 * @param  {Number}   curPage            [description]  当前页
 * @param  {Number}   eachPage           [description]  每页显示条数
 * @param  {[type]}   populate}         [description]   关联字段
 * @param  {Function} callback           [description]  
 * @return {[type]}                      [description]
 */
module.exports.query = async({
	modelName,
	queryTerms,
	sort = {
		_id: 1
	},
	curPage = 1,
	eachPage = 10,
	populate
}) => {

	const page = {}
	page.curPage = curPage;
	page.eachPage = eachPage;

	page.count = await new Promise((resolve, reject) => {
		const model = mongoose
			.model(modelName)
			.count(queryTerms)
			.exec((err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
	})

	page.maxPage = Math.ceil(page.count / page.eachPage)

	page.data = await new Promise((resolve, reject) => {
		const model = mongoose
			.model(modelName)
			.find(queryTerms);
		if (populate) {
			for (let item of populate) {
				model.populate(item)
			}
		}
		model
			.sort(sort)
			.skip(eachPage * (curPage - 1))
			.limit(parseInt(eachPage))
			.exec((err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
	})

	return page
}

module.exports.groupBy = async({
	groupModel,
	match,
	group,
	modelName,
	sort,
	curPage,
	eachPage,
	populate
}) => {
	const data = await new Promise((resolve, reject) => {
		mongoose
			.model(groupModel)
			.aggregate()
			.match(match)
			.group(group)
			.exec((err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
	})
	return module.exports.query({
		modelName,
		queryTerms: {
			_id: {
				$in: data.map((item) => item._id)
			}
		},
		sort,
		curPage,
		eachPage,
		populate
	})
}

module.exports.create = async({
	modelName,
	insertData
}) => {
	return await new Promise((resolve, reject) => {
		mongoose.model(modelName).create(insertData, (err, data) => {
			if (err) console.log(err)
			else resolve(data)
		})
	})
}

module.exports.update = async({
	modelName,
	queryTerms,
	updateData
}) => {
	return await new Promise((resolve, reject) => {
		mongoose
			.model(modelName)
			.update(queryTerms, updateData, (err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
	})
}