import { getEnabledCodes } from '../../services/languages'

const state = {
	languages: [],
	languagesLoading: false,
	selectedLanguage: null,
}

const getters = {
	languages: state => state.languages,
	languagesLoading: state => state.languagesLoading,
	selectedLanguage: state => state.selectedLanguage,
}

const mutations = {
	'GET_LANGUAGES_REQUEST': (state) => {
		state.languagesLoading = true
	},

	'GET_LANGUAGES_SUCCESS': (state, payload) => {
		state.languages = payload
		state.languagesLoading = false
	},

	'GET_LANGUAGES_FAILURE': (state) => {
		state.languages = []
		state.languagesLoading = false
	},

	'UPDATE_SELECTED_LANGUAGE': (state, payload) => {
		state.selectedLanguage = payload
	},
}

const actions = {
	getLanguages: async (store) => {
		store.commit('GET_LANGUAGES_REQUEST')

		try {
			const { data } = await getEnabledCodes()

			const languages = Object.keys(data).map((code) => {
				return {
					code,
					value: data[code],
				}
			})

			store.commit('GET_LANGUAGES_SUCCESS', languages)
		} catch (err) {
			store.commit('GET_LANGUAGES_FAILURE')
		}
	},

	updateSelectedLanguage: (store, language) => {
		store.commit('UPDATE_SELECTED_LANGUAGE', language)
	},
}

const languages = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default languages
