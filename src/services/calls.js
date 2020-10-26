import instance from './instance'

function callWaiter (params = {}) {
	return instance.post('calls/waiter', params)
}

function billRequest (params = {}) {
	return instance.post('calls/bill', params)
}

export {
	callWaiter,
	billRequest,
}
