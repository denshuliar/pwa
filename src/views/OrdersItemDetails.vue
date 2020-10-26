<template>
	<div class="Details">

		<!-- app nav back start -->

		<AppNavBack />

		<!-- app nav back end -->

		<template v-if="item">

			<!-- heading start -->

			<AppHeading
				:title="getName"
				subtitle="Check your order"
			/>

			<!-- heading end -->

			<!-- content start -->

			<div class="container">
				<div class="row">
					<div class="col-12">
						<span class="total-price bottom-16">{{ currency }} {{ getTotalPrice() }}</span>

						<button
							v-if="isNewOrder"
							class="button-wide bottom-24"
							@click="prepareOrder()"
							:disabled="createOrderLoading"
						>
							<AppLoading v-if="createOrderLoading" type="ring" />

							<template v-else>Place Order</template>
						</button>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="row offset-16">
							<div class="col-12">
								<OrdersProductsList
									:isNewItem="isNewOrder"
									:list="item.products"
									:selectItem="selectItem"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- content end -->

		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppNavBack from '../components/AppNavBack.vue'
import AppHeading from '../components/AppHeading.vue'
import AppLoading from '../components/AppLoading.vue'

import OrdersProductsList from '../components/OrdersProductsList.vue'

export default {
	props: [
		'selectedItem',
	],

	components: {
		AppNavBack,
		AppHeading,
		AppLoading,

		OrdersProductsList,
	},

	data () {
		return {
			item: null,
			isNewOrder: false,
		}
	},

	computed: {
		...mapGetters({
			orders: 'orders/orders',
			newOrder: 'orders/newOrder',
			createOrderLoading: 'orders/createOrderLoading',
		}),

		getName () {
			return this.item.uuid ? `Order #${this.item.uuid.substr(this.item.uuid.length - 3).toUpperCase()}` : 'New order'
		},
	},

	mounted () {
		if (this.selectedItem) {
			this.item = this.selectedItem
		} else if (this.orders.length) {
			const { orderId } = this.$router.history.current.params

			this.item = this.orders.find((order) => order.uuid === orderId)
		} else {
			this.fetchData()
		}

		this.checkIsNewOrder()
	},

	methods: {
		...mapActions({
			createOrder: 'orders/createOrder',
			getOrders: 'orders/getOrders',
		}),

		async fetchData () {
			await this.getOrders()

			const { orderId } = this.$router.history.current.params

			if (orderId !== 'new-order') {
				const filteredOrders = this.orders.filter((order) => order.uuid === orderId)

				if (filteredOrders.length) [this.item] = filteredOrders
			} else {
				this.item = this.newOrder
			}
		},

		checkIsNewOrder () {
			const { orderId } = this.$router.history.current.params

			if (orderId === 'new-order') this.isNewOrder = true
		},

		getTotalPrice () {
			let price = 0

			this.item.products.forEach((product) => {
				price += product.product[0].price * product.order_quantity
			})

			return price
		},

		async prepareOrder () {
			if (this.item && this.item.products && !this.item.products.length) return

			try {
				await this.createOrder(this.item)

				const { orderId } = this.$router.history.current.params

				this.$router.push({
					name: 'orders-item-details-success',
					params: {
						orderId,
					},
				})
			} catch (err) {
				console.log(err)
			}
		},

		selectItem ({ product }) {
			const item = product[0]

			this.$router.push({
				name: 'menu-item-details',
				params: {
					categoryId: item.categories[0].id,
					productId: item.id,
					selectedItem: item,
					onlyView: true,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
