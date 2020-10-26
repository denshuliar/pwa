import instance from './instance'

function createTableOrder (params = {}) {
	return instance.post('order/create/table', params)
}

function getOrderByUUID (uuid) {
	return instance.get(`order/${uuid}`)
}

function addOrderRewiev (uuid, params = {}) {
	return instance.post(`order/review/${uuid}/add`, params)
}

export {
	createTableOrder,
	getOrderByUUID,
	addOrderRewiev,
}
