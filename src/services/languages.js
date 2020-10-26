import instance from './instance'

function getEnabledCodes () {
	return instance.get('lang/enabled.json')
}

export {
	getEnabledCodes,
}
