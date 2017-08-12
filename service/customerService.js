const customerDao = require("../dao/customerDao.js")

module.exports.getCustomerByPage = async(page) => {
	return await customerDao.getCustomerByPage(page)
}
