import Vue from 'vue'
import Vuex from 'vuex'

import calls from './modules/calls'
import categories from './modules/categories'
import client from './modules/client'
import languages from './modules/languages'
import orders from './modules/orders'
import products from './modules/products'
import session from './modules/session'
import views from './modules/views'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		calls,
		categories,
		client,
		languages,
		orders,
		products,
		session,
		views,
	},
})

export default store
