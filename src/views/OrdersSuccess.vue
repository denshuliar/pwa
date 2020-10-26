<template>
	<div class="OrderSuccess">

		<!-- content start -->

		<div class="container">
			<div class="row">
				<div class="col-12 text-center">
					<div class="align-container">
						<div class="align-container__item">
							<div class="order-success">
								<Lottie
									:options="defaultOptions"
									:height="400"
								/>

								<h3 class="order-success__title">Your order is successful</h3>
								<p class="order-success__text">Please check your order status on the orders page</p>

								<button
									class="order-success__action"
									@click="$router.push({
										path: '/orders',
									})"
								>
									Continue
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
import Lottie from 'vue-lottie'

import * as animationData from '../assets/lottie/success.json'

export default {
	components: {
		Lottie,
	},

	data () {
		return {
			defaultOptions: {
				animationData: animationData.default,
				loop: false,
			},
		}
	},
}
</script>

<style lang="scss">
	.OrderSuccess {
		.align-container {
			min-height: 100vh;
		}
	}

	.order-success {
		&__title {
			font-size: 18px;
			line-height: 22px;
			font-weight: 600;
			letter-spacing: -0.0241176em;
			margin: 0;
		}

		&__text {
			color: #9CA7B5;
			font-size: 12px;
			line-height: 28px;
			margin: 8px 0 0 0;
		}

		&__action {
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
		}
	}
</style>
