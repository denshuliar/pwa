import {
	getOrderByUUID,
	addOrderRewiev,
	createTableOrder,
} from '../../services/orders'

import {
	getValue,
	setValue,
	removeValue,
} from '../../services/session'

const state = {
	orders: [],
	ordersLoading: false,

	createOrderLoading: false,
	createFeedbackLoading: false,

	newOrder: {
		products: [],
	},
}

const getters = {
	orders: state => state.orders,
	ordersLoading: state => state.ordersLoading,

	createOrderLoading: state => state.createOrderLoading,
	createFeedbackLoading: state => state.createFeedbackLoading,

	newOrder: state => state.newOrder,
}

const mutations = {
	'GET_ORDERS_REQUEST': (state) => {
		state.ordersLoading = true
	},

	'GET_ORDERS_SUCCESS': (state, payload) => {
		state.orders = payload
		state.ordersLoading = false
	},

	'GET_ORDERS_FAILURE': (state) => {
		state.ordersLoading = false
	},

	'CREATE_ORDER_REQUEST': (state) => {
		state.createOrderLoading = true
	},

	'CREATE_ORDER_SUCCESS': (state, payload) => {
		state.newOrder = {
			products: [],
		}

		state.orders.push(payload)

		state.createOrderLoading = false
	},

	'CREATE_ORDER_FAILURE': (state) => {
		state.createOrderLoading = false
	},

	'CREATE_FEEDBACK_REQUEST': (state) => {
		state.createFeedbackLoading = true
	},

	'CREATE_FEEDBACK_SUCCESS': (state) => {
		state.createFeedbackLoading = false
	},

	'CREATE_FEEDBACK_FAILURE': (state) => {
		state.createFeedbackLoading = false
	},

	'SET_ORDER': (state, payload) => {
		state.newOrder = payload
	},

	'ADD_ORDER_PRODUCT': (state, payload) => {
		state.newOrder.products.push(payload)

		setValue('activeOrder', state.newOrder)
	},

	'REMOVE_ORDER_PRODUCT': (state, payload) => {
		const index = state.newOrder.products.indexOf(payload)

		if (index > -1) {
			state.newOrder.products.splice(index, 1)

			setValue('activeOrder', state.newOrder)
		}
	},
}

const actions = {
	getOrders: async (store) => {
		const orders = getValue('orders')

		if (orders && orders.length) {
			store.commit('GET_ORDERS_REQUEST')

			try {
				const ordersRequests = orders.map((order) => getOrderByUUID(order))

				const data = await Promise.all(ordersRequests)

				const preparedOrders = data.map((order) => order.data.data)

				store.commit('GET_ORDERS_SUCCESS', preparedOrders)
			} catch (err) {
				store.commit('GET_ORDERS_FAILURE')
			}
		}
	},

	createOrder: (store, params) => {
		return new Promise((resolve, reject) => {
			store.commit('CREATE_ORDER_REQUEST')

			const order = {
				table_id: getValue('table'),
				products: params.products.map((product) => {
					return {
						product_id: product.product[0].id,
						quantity: product.order_quantity,
					}
				}),
			}

			return createTableOrder(order)
				.then(({ data }) => {
					const orders = getValue('orders') || []

					orders.push(data.data.order.uuid)

					removeValue('activeOrder')

					setValue('orders', orders)

					store.commit('CREATE_ORDER_SUCCESS', data.data.order)

					resolve()
				})
				.catch(() => {
					store.commit('CREATE_ORDER_FAILURE')

					reject()
				})
		})
	},

	createFeedback: (store, params) => {
		return new Promise((resolve, reject) => {
			if (params.orders.length) {
				store.commit('CREATE_FEEDBACK_REQUEST')

				const ordersRequests = params.orders
					.map((order) => addOrderRewiev(order.uuid, { review: params.review }))

				return Promise
					.all(ordersRequests)
					.then(() => {
						store.commit('CREATE_FEEDBACK_SUCCESS')

						resolve()
					})
					.catch(() => {
						store.commit('CREATE_FEEDBACK_FAILURE')

						reject()
					})
			} else {
				return Promise.reject()
			}
		})
	},

	setOrder: (store, order) => {
		store.commit('SET_ORDER', order)
	},

	addOrderProduct: (store, order) => {
		store.commit('ADD_ORDER_PRODUCT', order)
	},

	removeOrderProduct: (store, order) => {
		store.commit('REMOVE_ORDER_PRODUCT', order)
	},
}

const orders = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

export default orders
