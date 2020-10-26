const state = {
	tableId: null,
}

const getters = {
	tableId: state => state.tableId,
}

const mutations = {
	'SET_TABLE': (state, payload) => {
		state.tableId = payload
	},

	'DELETE_TABLE': (state) => {
		state.tableId = null
	},
}

const actions = {
	setTable: (store, params) => {
		store.commit('SET_TABLE', params)
	},

	deleteTable: (store) => {
		store.commit('DELETE_TABLE')
	},
}

const session = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default session
