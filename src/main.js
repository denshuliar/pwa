import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'

import router from './router'
import store from './store'

import './mixins/translations'
import './mixins/currency'

import {
	getValue,
	setValue,
	removeValue,
	getValueWithExpiry,
	setValueWithExpiry,
} from './services/session'

import './assets/styles/main.scss'

import wb from './registerServiceWorker'

Vue.prototype.$workbox = wb

Vue.config.productionTip = false

Vue.use(VueLazyload, {
	preLoad: 1.3,
	attempt: 1,
	observer: true,
})

function checkCurrentSession () {
	const urlParams = new URLSearchParams(window.location.search)

	const tableId = urlParams.get('table')

	if (tableId) {
		const currentSessionTableId = getValue('table')

		if (currentSessionTableId && tableId !== currentSessionTableId.toString()) {
			removeValue('activeOrder')
			removeValue('orders')
		} else if (currentSessionTableId && tableId === currentSessionTableId.toString()) {
			setValue('userScannedTheSameCode', true)
		}

		setValue('table', tableId)

		const hours = 60 * 60 * 1000

		setValueWithExpiry('session', null, 3 * hours)

		store.dispatch('session/setTable', tableId)
		store.dispatch('views/addView')

		window.history.pushState(null, null, window.location.pathname)
	} else if (getValueWithExpiry('session')) {
		const currentSessionTableId = getValue('table')

		if (currentSessionTableId) {
			store.dispatch('session/setTable', currentSessionTableId)
		}
	} else {
		removeValue('activeOrder')
		removeValue('orders')
		removeValue('table')
		removeValue('session')
	}
}

checkCurrentSession()

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
