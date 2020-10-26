<template>
	<div class="OrdersProductsItem">
		<div class="OrdersProductsItem__img">
			<img
				class="img--bg"
				alt="dish"
				v-lazy="{
					'src': getImage(),
					'error': client.cover_image
				}"
			/>
		</div>

		<div class="OrdersProductsItem__details">
			<div class="row">
				<div class="col-8">
					<span class="OrdersProductsItem__category">
						{{ getTranslation(item.product[0].categories[0].name) }}
					</span>
				</div>

				<div
					v-if="isNewItem"
					class="col-4 text-right"
					@click="removeProduct($event)"
				>
					<button class="OrdersProductsItem__action">
						<CloseIcon />
					</button>
				</div>
			</div>

			<h5 class="OrdersProductsItem__title">{{ getTranslation(item.product[0].name) }}</h5>

			<div class="row">
				<div class="col">
					<div class="OrdersProductsItem__price">
						<span>x{{ item.order_quantity }}</span> {{ currency }} {{ item.product[0].price }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	props: [
		'isNewItem',
		'item',
	],

	components: {
		CloseIcon: () => import('../assets/images/close.svg'),
	},

	methods: {
		...mapActions({
			removeOrderProduct: 'orders/removeOrderProduct',
		}),

		getImage () {
			return this.item.product[0].images[0]
		},

		removeProduct (event) {
			event.stopPropagation()

			this.removeOrderProduct(this.item)
		},
	},
}
</script>

<style lang="scss" scoped>
	.OrdersProductsItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	@media only screen and (min-width: 576px) {
		.OrdersProductsItem {
			flex-direction: column;
		}
	}

	.OrdersProductsItem {
		img[lazy="loaded"] {
			border-radius: 15px;
		}

		&__img {
			position: relative;
			width: 28%;
			overflow: hidden;
			border-radius: 15px;
			margin-bottom: 0;
		}

		@media only screen and (min-width: 576px) {
			&__img {
				width: 100%;
				margin-bottom: 24px;
			}
		}

		&__img::before {
			content: "";
			display: block;
			padding-top: percentage(101/96);
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0) 75.34%);
			position: relative;
			z-index: 1;
		}

		@media only screen and (min-width: 576px) {
			&__img::before {
				padding-top: percentage(100/323);
			}
		}

		&__details {
			width: calc(72% - 16px);
		}

		@media only screen and (min-width: 576px) {
			&__details {
				width: 100%;
			}
		}

		&__category {
			display: inline-block;
			font-size: 12px;
			line-height: 25px;
			font-weight: 600;
			height: 25px;
			background: #ECF0F4;
			border-radius: 6px;
			padding: 0 10px;
			margin-bottom: 5px;
		}

		&__action {
			padding: 0;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			height: 30px;
			width: 30px;
			border-radius: 50%;
			border: none;
			background: #ECF0F4;
		}

		&__title {
			font-size: 16px;
			line-height: 19px;
			font-weight: 600;
			width: calc(100% - 40px);
			margin-bottom: 10px;
			min-height: 38px;
		}

		&__weight {
			color: #9CA7B5;
			font-size: 14px;
			line-height: 17px;
			font-weight: 500;
		}

		&__price {
			font-size: 18px;
			line-height: 22px;
			font-weight: 600;
		}

		&__price span {
			color: $blue;
			font-size: 14px;
			font-weight: 500;
		}
	}
</style>
