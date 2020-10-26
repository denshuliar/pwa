import { getProducts } from '../../services/products'

const state = {
	products: [],
	productsLoading: false,
}

const getters = {
	products: state => state.products,
	productsLoading: state => state.productsLoading,
}

const mutations = {
	'GET_PRODUCTS_REQUEST': (state) => {
		state.productsLoading = true
	},

	'GET_PRODUCTS_SUCCESS': (state, payload) => {
		state.products = payload
		state.productsLoading = false
	},

	'GET_PRODUCTS_FAILURE': (state) => {
		state.products = []
		state.productsLoading = false
	},
}

const actions = {
	getProducts: async (store) => {
		store.commit('GET_PRODUCTS_REQUEST')

		try {
			const { data } = await getProducts()

			store.commit('GET_PRODUCTS_SUCCESS', data.data)
		} catch (err) {
			store.commit('GET_PRODUCTS_FAILURE')
		}
	},
}

const products = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default products
