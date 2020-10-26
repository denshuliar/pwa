import instance from './instance'

function getCategories () {
	return instance.get('categories')
}

export {
	getCategories,
}
