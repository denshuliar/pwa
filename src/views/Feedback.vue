<template>
	<div class="Feedback">

		<!-- nav back start -->

		<AppNavBack
			class="bottom-8"
			title="Feedback"
			@click="navigateToOrders()"
		/>

		<!-- nav back end -->

		<!-- heading start -->

		<AppHeading title="Describe your impression" />

		<!-- heading end -->

		<!-- content start -->

		<div class="feedback-block">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<h5 class="feedback-block__title">Feedback</h5>

						<input
							class="feedback-block__input"
							type="text"
							placeholder="Some words"
							v-model="review"
						/>

						<p class="feedback-block__text">no more than 500 symbols</p>
					</div>
				</div>
			</div>
		</div>

		<div class="buttons-block">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<button
							class="button-wide"
							@click="prepareFeedback()"
						>
							Sent
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- cotent end -->

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppNavBack from '../components/AppNavBack.vue'
import AppHeading from '../components/AppHeading.vue'

export default {
	components: {
		AppNavBack,
		AppHeading,
	},

	data () {
		return {
			review: '',
		}
	},

	computed: {
		...mapGetters({
			createFeedbackLoading: 'orders/createFeedbackLoading',
			orders: 'orders/orders',
		}),
	},

	created () {
		if (!this.orders.length) this.getOrders()
	},

	methods: {
		...mapActions({
			createFeedback: 'orders/createFeedback',
			getOrders: 'orders/getOrders',
		}),

		async prepareFeedback () {
			if (!this.review) return

			const orders = this.orders.filter((order) => !order.review)

			if (orders.length) {
				try {
					await this.createFeedback({ orders, review: this.review })

					this.navigateToOrders()
				} catch (err) {
					console.log(err)
				}
			}
		},

		navigateToOrders () {
			this.$router.push({ path: '/' })
		},
	},
}
</script>

<style lang="scss" scoped>
	.feedback-block {
		&__title {
			font-size: 18px;
			font-weight: 600;
			line-height: 22px;
			letter-spacing: -0.01em;
			margin-bottom: 0;
		}

		&__text {
			color: #828282;
			font-size: 12px;
			line-height: 20px;
			margin: 8px 0 0 0;
		}

		&__input {
			font-size: 14px;
			line-height: 20px;
			padding: 16px 0;
			border: none;
			border-bottom: 1px solid rgba(35%, 11%, 28%, 0.1);
			width: 100%;
		}

		&__input::placeholder {
			color: #BDBDBD;
			font-size: 14px;
			line-height: 20px;
			font-style: italic;
			opacity: 1;
		}
	}

	.buttons-block {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 30px 0;
	}
</style>
