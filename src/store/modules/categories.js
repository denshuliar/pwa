import { getCategories } from '../../services/categories'

const state = {
	categories: [],
	categoriesLoading: false,
	selectedCategory: null,
}

const getters = {
	categories: state => state.categories,
	categoriesLoading: state => state.categoriesLoading,
	selectedCategory: state => state.selectedCategory,
}

const mutations = {
	'GET_CATEGORIES_REQUEST': (state) => {
		state.categoriesLoading = true
	},

	'GET_CATEGORIES_SUCCESS': (state, payload) => {
		state.categories = payload
		state.categoriesLoading = false
	},

	'GET_CATEGORIES_FAILURE': (state) => {
		state.categories = []
		state.categoriesLoading = false
	},

	'UPDATE_SELECTED_CATEGORY': (state, payload) => {
		state.selectedCategory = payload
	},
}

const actions = {
	getCategories: async (store) => {
		store.commit('GET_CATEGORIES_REQUEST')

		try {
			const { data } = await getCategories()

			store.commit('GET_CATEGORIES_SUCCESS', data.data)
		} catch (err) {
			store.commit('GET_CATEGORIES_FAILURE')
		}
	},

	updateSelectedCategory: (store, category) => {
		store.commit('UPDATE_SELECTED_CATEGORY', category)
	},
}

const categories = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default categories
