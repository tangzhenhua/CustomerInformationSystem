const userDao = require("../dao/userDao.js")

module.exports.login = async(user) => {
	return await userDao.login(user)
}

module.exports.reg = async(user) => {
	return await userDao.reg(user)
}

module.exports.isUse = async(user) => {
	const data = await userDao.isUse(user)
	if (data.count === 1) {
		return {
			count: 1
		}
	} else {
		return {
			count: 0
		}
	}
}