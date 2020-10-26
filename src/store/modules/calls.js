import {
	callWaiter,
	billRequest,
} from '../../services/calls'

import { getValue } from '../../services/session'

const state = {
	callWaiterLoading: false,
	callBillLoading: false,
}

const getters = {
	callWaiterLoading: state => state.callWaiterLoading,
	callBillLoading: state => state.callBillLoading,
}

const mutations = {
	'CALL_WAITER_REQUEST': (state) => {
		state.callWaiterLoading = true
	},

	'CALL_WAITER_SUCCESS': (state) => {
		state.callWaiterLoading = false
	},

	'CALL_WAITER_FAILURE': (state) => {
		state.callWaiterLoading = false
	},

	'CALL_BILL_REQUEST': (state) => {
		state.callBillLoading = true
	},

	'CALL_BILL_SUCCESS': (state) => {
		state.callBillLoading = false
	},

	'CALL_BILL_FAILURE': (state) => {
		state.callBillLoading = false
	},
}

const actions = {
	callWaiter: async (store) => {
		store.commit('CALL_WAITER_REQUEST')

		const tableId = getValue('table')

		try {
			await callWaiter({ table_id: tableId })

			setTimeout(() => {
				store.commit('CALL_WAITER_SUCCESS')
			}, 2000)
		} catch (err) {
			store.commit('CALL_WAITER_FAILURE')
		}
	},

	callBill: (store) => {
		return new Promise((resolve, reject) => {
			const orders = getValue('orders')
			const tableId = getValue('table')

			if (orders && orders.length) {
				store.commit('CALL_BILL_REQUEST')

				const ordersRequests = orders
					.map((orderId) => billRequest({ table_id: tableId, order_uuid: orderId }))

				return Promise
					.all(ordersRequests)
					.then(() => {
						store.commit('CALL_BILL_SUCCESS')

						resolve()
					})
					.catch(() => {
						store.commit('CALL_BILL_FAILURE')

						reject()
					})
			} else {
				return Promise.reject()
			}
		})
	},
}

const calls = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default calls
