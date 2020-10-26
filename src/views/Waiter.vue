<template>
	<div class="Waiter">

		<!-- content start -->

		<div class="container">
			<div class="row">
				<div class="col text-center">
					<div class="align-container">
						<div class="align-container__item">
							<div class="call-waiter">
								<button
									class="call-waiter__button"
									:class="{
										'call-waiter__button--calling': callWaiterLoading
									}"
									@click="callWaiter()"
									:disabled="callWaiterLoading"
								>
									<bellWaiterIcon />

									<span class="call-waiter__button-text">Click on me</span>
								</button>

								<h3 class="call-waiter__title">Сall a waiter</h3>
								<p class="call-waiter__text">The waiter can help you with questions</p>

								<button
									v-if="orders.length"
									class="call-waiter__action"
									@click="prepareBill()"
									:disabled="callBillLoading"
								>
									<AppLoading v-if="callBillLoading" type="ring" />

									<template v-else>Bill request</template>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- content end -->

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { removeValue } from '../services/session'

import AppLoading from '../components/AppLoading.vue'

export default {
	components: {
		bellWaiterIcon: () => import('../assets/images/bellWaiter.svg'),

		AppLoading,
	},

	computed: {
		...mapGetters({
			callWaiterLoading: 'calls/callWaiterLoading',
			callBillLoading: 'calls/callBillLoading',

			orders: 'orders/orders',
			ordersLoading: 'orders/ordersLoading',
		}),
	},

	created () {
		if (!this.orders.length) this.getOrders()
	},

	methods: {
		...mapActions({
			callWaiter: 'calls/callWaiter',
			callBill: 'calls/callBill',

			getOrders: 'orders/getOrders',

			deleteTable: 'session/deleteTable',
		}),

		async prepareBill () {
			try {
				await this.callBill()

				removeValue('table')
				removeValue('session')
				removeValue('activeOrder')
				removeValue('orders')

				this.deleteTable()

				this.$router.push({ path: '/feedback' })
			} catch (err) {
				console.log(err)
			}
		},
	},
}
</script>

<style lang="scss">
	.Waiter {
		.align-container {
			height: calc(100vh - 140px);
		}

		.align-container__item {
			height: 428px;
		}
	}

	.call-waiter {
		min-height: 340px;

		&__button {
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			background:	$blue-transparent;
			padding: 47px 0 23px 0;
			border-radius: 20px;
			border: none;
			min-width: 148px;
			transform: scale(1);

			&--calling {
				min-width: 149px;
				animation: pulse-blue 1s infinite;
			}
		}

		&__button-text {
			color: #FFF;
			font-size: 14px;
			line-height: 12px;
			font-weight: 600;
			margin-top: 12px;
		}

		&__title {
			font-size: 18px;
			line-height: 22px;
			font-weight: 600;
			letter-spacing: -0.0241176em;
			margin: 39px 0 0 0;
		}

		&__text {
			color: #9CA7B5;
			font-size: 12px;
			line-height: 28px;
			margin: 8px 0 0 0;
		}

		&__action {
			overflow: hidden;
			color: #FFF;
			display: inline-block;
			margin-top: 32px;
			border: none;
			border-radius: 10px;
			background: $blue;
			font-size: 18px;
			height: 56px;
			line-height: 56px;
			font-weight: 600;
			letter-spacing: -0.0241176em;
			padding: 0 15px;
			min-width: 173px;
			position: relative;
		}
	}
</style>
