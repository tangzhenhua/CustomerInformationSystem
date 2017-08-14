const callRecordDao = require("../dao/callRecordDao.js")
module.exports.getCallRecordByPage = async(page) => {
	return await callRecordDao.getCallRecordByPage(page)
}

module.exports.addCallRecord = async(callRecord) => {
	return await callRecordDao.addCallRecord(callRecord)
}