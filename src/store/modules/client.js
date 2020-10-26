import { getClient } from '../../services/client'

const state = {
	client: null,
	clientLoading: false,
}

const getters = {
	client: state => state.client,
	clientLoading: state => state.clientLoading,
}

const mutations = {
	'GET_CLIENT_REQUEST': (state) => {
		state.clientLoading = true
	},

	'GET_CLIENT_SUCCESS': (state, payload) => {
		state.client = payload
		state.clientLoading = false
	},

	'GET_CLIENT_FAILURE': (state) => {
		state.client = null
		state.clientLoading = false
	},
}

const actions = {
	getClient: (store) => {
		return new Promise((resolve, reject) => {
			store.commit('GET_CLIENT_REQUEST')

			return getClient()
				.then(({ data }) => {
					store.commit('GET_CLIENT_SUCCESS', data.data)

					resolve()
				})
				.catch(() => {
					store.commit('GET_CLIENT_FAILURE')

					reject()
				})
		})
	},
}

const client = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default client
