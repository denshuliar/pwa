<template>
	<div class="MenuItemDetails">

		<!-- app nav back start -->

		<AppNavBack class="bottom-16" />

		<!-- app nav back end -->

		<!-- content start -->

		<div
			v-if="item"
			class="item-details top-16"
		>
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="item-details__img">
							<div class="item-details__category">
								{{ getTranslation(item.categories[0].name) }}
							</div>

							<img
								v-lazy="{
									'src': getImage(),
									'error': client.cover_image
								}"
								alt="dishes"
								class="img--bg"
							/>
						</div>

						<h3 class="item-details__title">{{ getTranslation(item.name) }}</h3>

						<div class="item-details__price-block">
							<span class="item-details__price">{{ currency }} {{ item.price }}</span>
						</div>

						<ul class="item-details__list">
							<li
								v-for="(item, index) in ingredients"
								:key="index"
							>
								{{ item }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div
				v-if="tableId && !onlyView"
				class="item-details__action-bar"
			>
				<div class="container">
					<div class="row align-items-center">
						<div class="col-5">
							<div class="counter">
								<button
									class="counter__minus"
									@click="decrement()"
								/>

								<span class="counter__value">{{ quantity }}</span>

								<button
									class="counter__plus"
									@click="increment()"
								/>
							</div>
						</div>

						<div class="col-7 text-right">
							<button
								class="item-details__action"
								@click="prepareOrder()"
								:disabled="addedToOrder"
							>
								<template v-if="addedToOrder">Added</template>
								<template v-else>Add to order</template>
							</button>
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

import AppNavBack from '../components/AppNavBack.vue'

export default {
	props: [
		'selectedItem',
		'onlyView',
	],

	components: {
		AppNavBack,
	},

	beforeRouteEnter (to, from, next) {
		next((vm) => {
			vm.previousRoute = from
		})
	},

	data () {
		return {
			quantity: 1,
			item: null,
			previousRoute: null,
			addedToOrder: false,
		}
	},

	computed: {
		...mapGetters({
			tableId: 'session/tableId',

			products: 'products/products',
		}),

		total () {
			return Number(this.item.price * this.quantity).toFixed(2)
		},

		ingredients () {
			if (this.item && this.item.description) {
				const translation = this.getTranslation(this.item.description)

				if (translation) {
					return translation.split(',')
				}
			}

			return []
		},
	},

	mounted () {
		if (this.selectedItem) {
			this.item = this.selectedItem
		} else {
			this.fetchData()
		}
	},

	methods: {
		...mapActions({
			addOrderProduct: 'orders/addOrderProduct',

			getProducts: 'products/getProducts',
		}),

		decrement () {
			if (this.quantity > 1) this.quantity--
		},

		increment () {
			this.quantity++
		},

		async fetchData () {
			await this.getProducts()

			const { productId } = this.$router.history.current.params

			const filteredItems = this.products.filter((item) => item.id === Number(productId))

			if (filteredItems.length) [this.item] = filteredItems
		},

		prepareOrder () {
			const order = {
				product: [this.item],
				order_quantity: this.quantity,
			}

			this.addOrderProduct(order)

			this.addedToOrder = true
		},

		getImage () {
			return this.item.images[0]
		},
	},
}
</script>

<style lang="scss" scoped>
	.item-details {
		position: relative;
		padding-bottom: 168px;

		&__img {
			position: relative;
			overflow: hidden !important;
			border-radius: 20px;
		}

		img[lazy="loaded"] {
			border-radius: 20px;
		}

		&__img::before {
			content: "";
			display: block;
			padding-top: percentage(187/343);
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0) 75.34%);
			position: relative;
			z-index: 0;
		}

		&__category {
			position: absolute;
			top: 16px;
			left: 16px;
			display: inline-block;
			color: #24242E;
			font-size: 12px;
			line-height: 21px;
			height: 21px;
			background: #FFFFFF;
			border-radius: 6px;
			padding: 0 10px;
		}

		&__title {
			font-size: 24px;
			line-height: 29px;
			font-weight: 600;
			margin-top: 16px;
			margin-bottom: 0;
		}

		&__price-block {
			display: flex;
			align-items: center;
			margin-top: 16px;
		}

		&__price {
			font-size: 18px;
			line-height: 22px;
			font-weight: 600;
			margin-right: 19px;
		}

		&__weight {
			color: #858585;
			font-size: 18px;
			line-height: 22px;
			font-weight: 500;
		}

		&__list {
			color: rgba(0, 0, 0, 0.6);
			font-size: 12px;
			line-height: 28px;
			padding-left: 15px;
			margin: 10px 0 0 0;
			list-style: none;
		}

		&__list li {
			position: relative;
		}

		&__list li::before {
			content: "";
			display: block;
			height: 5px;
			width: 5px;
			border-radius: 50%;
			background: #C4C4C4;
			position: absolute;
			top: 11px;
			left: -15px;
		}

		&__action-bar {
			position: fixed;
			z-index: 5;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 16px 0 46px 0;
			background: #FFFFFF;
			box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
			border-radius: 20px 20px 0px 0px;
		}

		&__total {
			font-size: 18px;
			line-height: 22px;
			font-weight: 600;
		}

		&__action {
			color: #FFF;
			font-size: 18px;
			height: 56px;
			line-height: 56px;
			min-width: 159px;
			max-width: 173px;
			padding: 0 10px;
			background: $blue;
			border: none;
			border-radius: 16px;
		}

		&__action:disabled {
			background: #81ADEF;
		}
	}
</style>
