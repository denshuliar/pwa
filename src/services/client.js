import instance from './instance'

function getClient () {
	return instance.get('outlet/info.json')
}

export {
	getClient,
}
