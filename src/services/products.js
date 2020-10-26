import instance from './instance'

function getProducts () {
	return instance.get('products')
}

export {
	getProducts,
}
