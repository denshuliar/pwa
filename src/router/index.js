import Vue from 'vue'
import VueRouter from 'vue-router'

import { getValue } from '../services/session'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/menu',
	},
	{
		path: '/404',
		name: '404',
		component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
	},
	{
		path: '*',
		redirect: '/404',
	},
	{
		path: '/languages',
		name: 'languages',
		component: () => import(/* webpackChunkName: "Languages" */ '../views/Languages.vue'),
	},
	{
		path: '/categories',
		name: 'categories',
		component: () => import(/* webpackChunkName: "Categories" */ '../views/Categories.vue'),
	},
	{
		path: '/categories-modal',
		name: 'categories-modal',
		component: () => import(/* webpackChunkName: "CategoriesModal" */ '../views/CategoriesModal.vue'),
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import(/* webpackChunkName: "Menu" */ '../views/Menu.vue'),
	},
	{
		path: '/menu/:categoryId/:productId',
		name: 'menu-item-details',
		component: () => import(/* webpackChunkName: "MenuItemDetails" */ '../views/MenuItemDetails.vue'),
		props: true,
	},
	{
		path: '/orders',
		name: 'orders',
		component: () => import(/* webpackChunkName: "Orders" */ '../views/Orders.vue'),
		meta: {
			isLoggedIn: true,
		},
	},
	{
		path: '/orders/:orderId',
		name: 'orders-item-details',
		component: () => import(/* webpackChunkName: "OrdersItemDetails" */ '../views/OrdersItemDetails.vue'),
		props: true,
		meta: {
			isLoggedIn: true,
		},
	},
	{
		path: '/orders/:orderId/success',
		name: 'orders-item-details-success',
		component: () => import(/* webpackChunkName: "OrdersSuccess" */ '../views/OrdersSuccess.vue'),
		meta: {
			isLoggedIn: true,
		},
	},
	{
		path: '/feedback',
		name: 'feedback',
		component: () => import(/* webpackChunkName: "Feedback" */ '../views/Feedback.vue'),
	},
	{
		path: '/waiter',
		name: 'waiter',
		component: () => import(/* webpackChunkName: "Waiter" */ '../views/Waiter.vue'),
		meta: {
			isLoggedIn: true,
		},
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		return to.name === 'menu' && savedPosition ? savedPosition : { x: 0, y: 0 }
	},
})

router.beforeEach((to, from, next) => {
	if (to.meta.isLoggedIn === true && !getValue('table')) {
		next({ name: 'menu' })
	} else if (to.name !== 'languages' && !getValue('selectedLanguage')) {
		next({ name: 'languages' })
	} else {
		next()
	}
})

export default router
