<template>
	<div id="app">
		<transition
			v-if="showSplashScreen"
			name="fade"
		>
			<AppSplashScreen />
		</transition>

		<template v-else>
			<AppNav v-if="showNav" />

			<router-view />

			<AppTabs v-if="tableId && showTabs" />
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { getValue } from './services/session'

import AppNav from './components/AppNav.vue'
import AppTabs from './components/AppTabs.vue'
import AppSplashScreen from './components/AppSplashScreen.vue'

const routesWithNav = [
	'categories',
	'menu',
	'orders',
	'waiter',
]

const routesWithTabs = [
	'menu',
	'orders',
	'waiter',
]

export default {
	components: {
		AppNav,
		AppTabs,
		AppSplashScreen,
	},

	data () {
		return {
			showSplashScreen: true,
		}
	},

	computed: {
		...mapGetters({
			tableId: 'session/tableId',
		}),

		showNav () {
			return routesWithNav.includes(this.$route.name)
		},

		showTabs () {
			return routesWithTabs.includes(this.$route.name)
		},
	},

	created() {
		if (this.$workbox) {
			this.$workbox.addEventListener('waiting', () => {
				this.showUpgradeUI = true
			})
		}
	},

	mounted () {
		this.checkSelectedLanguage()
		this.getActiveOrder()
		this.fetchData()
	},

	methods: {
		...mapActions({
			getClient: 'client/getClient',

			updateSelectedLanguage: 'languages/updateSelectedLanguage',

			setOrder: 'orders/setOrder',
		}),

		async accept() {
			this.showUpgradeUI = false

			await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
		},

		async fetchData () {
			this.showSplashScreen = true

			await this.getClient()

			setTimeout(() => {
				this.showSplashScreen = false
			}, 1500)
		},

		checkSelectedLanguage () {
			const selectedLanguage = getValue('selectedLanguage')

			if (selectedLanguage) this.updateSelectedLanguage(selectedLanguage)
		},

		getActiveOrder () {
			const activeOrder = getValue('activeOrder')

			if (
				activeOrder
				&& activeOrder.products
				&& activeOrder.products.length
			) this.setOrder(activeOrder)
		},
	},
}
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
