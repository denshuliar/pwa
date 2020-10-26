<template>
	<div class="Order">

		<!-- heading start -->

		<AppHeading
			title="Orders"
			subtitle="Your order list"
		/>

		<!-- heading end -->

		<!-- content strat -->

		<div class="content">
			<div class="container">
				<div class="row offset-16">
					<div class="col-12">
						<AppLoading
							v-if="ordersLoading"
							style="padding: 0;"
						/>

						<AppNoData
							v-else-if="!ordersLoading && !orders.length && newOrder && !newOrder.products.length"
							text="You don't have any orders"
							style="padding: 0;"
						/>

						<OrdersList
							v-else
							:newItem="newOrder"
							:list="orders"
							:selectItem="selectItem"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- content end -->

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppLoading from '../components/AppLoading.vue'
import AppNoData from '../components/AppNoData.vue'
import AppHeading from '../components/AppHeading.vue'

import OrdersList from '../components/OrdersList.vue'

export default {
	components: {
		AppLoading,
		AppNoData,
		AppHeading,

		OrdersList,
	},

	computed: {
		...mapGetters({
			orders: 'orders/orders',
			ordersLoading: 'orders/ordersLoading',
			newOrder: 'orders/newOrder',
		}),
	},

	created () {
		if (!this.orders.length) this.getOrders()
	},

	methods: {
		...mapActions({
			getOrders: 'orders/getOrders',
		}),

		selectItem (item, isNewOrder) {
			this.$router.push({
				name: 'orders-item-details',
				params: {
					orderId: isNewOrder ? 'new-order' : item.uuid,
					selectedItem: item,
				},
			})
		},
	},
}
</script>

<style lang="scss"></style>
