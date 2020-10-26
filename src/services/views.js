import instance from './instance'

function viewsAdd (params = {}) {
	return instance.post('views/add', params)
}

export {
	viewsAdd,
}
