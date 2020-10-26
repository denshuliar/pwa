import { viewsAdd } from '../../services/views'

const state = {
	viewAddLoading: false,
}

const getters = {
	viewAddLoading: state => state.viewAddLoading,
}

const mutations = {
	'VIEWS_ADD_REQUEST': (state) => {
		state.viewAddLoading = true
	},

	'VIEWS_ADD_SUCCESS': (state) => {
		state.viewAddLoading = false
	},

	'VIEWS_ADD_FAILURE': (state) => {
		state.viewAddLoading = false
	},
}

const actions = {
	addView: async (store) => {
		store.commit('VIEWS_ADD_REQUEST')

		try {
			await viewsAdd()

			store.commit('VIEWS_ADD_SUCCESS')
		} catch (err) {
			store.commit('VIEWS_ADD_FAILURE')
		}
	},
}

const views = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default views
