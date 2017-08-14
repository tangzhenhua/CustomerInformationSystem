const customerDao = require("../dao/customerDao.js")

module.exports.getCustomerByPage = async(page) => {
	return await customerDao.getCustomerByPage(page)
}

module.exports.updateCustomerStatus = async(obj) => {
	return await customerDao.updateCustomerStatus(obj)
}

module.exports.insertCustomer = async(obj) => {
	return await customerDao.insertCustomer(obj)
}