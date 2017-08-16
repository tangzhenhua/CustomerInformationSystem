const callRecordDao = require("../dao/callRecordDao.js")

module.exports.getCallRecordByPage = async(page) => {
	return await callRecordDao.getCallRecordByPage(page)
}

module.exports.addCallRecord = async(callRecord) => {
	return await callRecordDao.addCallRecord(callRecord)
}

module.exports.removeCallRecord = async(callRecord) => {
	return await callRecordDao.removeCallRecord(callRecord)
}

module.exports.getCallRecordById = async(callRecord) => {
	return await callRecordDao.getCallRecordById(callRecord)
}

module.exports.updateCallRecordById = async(callRecord) => {
	return await callRecordDao.updateCallRecordById(callRecord)
}