<template>
	<div
		class="ProductsItem"
		:class="{
			'ProductsItem--no-img': !item.images.length
		}"
	>
		<img
			v-lazy="{
				'src': getImage(),
				'error': client.cover_image
			}"
			alt="dishes"
			class="img--bg"
		/>

		<div class="ProductsItem__top">
			<span class="ProductsItem__category">{{ getTranslation(item.categories[0].name) }}</span>
			<h6 class="ProductsItem__name">{{ getTranslation(item.name) }}</h6>

			<template v-if="!item.images.length">
				<span class="ProductsItem__price">{{ currency }} {{ item.price }}</span>

				<ul class="item-details__list">
					<li
						v-for="(item, index) in ingredients"
						:key="index"
					>
						{{ item }}
					</li>
				</ul>
			</template>

			<div
				v-else
				class="ProductsItem__details"
			>
				<span class="ProductsItem__price">{{ currency }} {{ item.price }}</span>
			</div>
		</div>

		<div v-if="tableId" class="ProductsItem__lower">
			<button
				class="ProductsItem__action"
				@click="prepareOrder($event)"
				:disabled="addedToOrder"
			>
				<span>
					<template v-if="addedToOrder">Added</template>
					<template v-else>Add to order</template>
				</span>
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	props: [
		'item',
	],

	data () {
		return {
			quantity: 1,
			addedToOrder: false,
		}
	},

	computed: {
		...mapGetters({
			tableId: 'session/tableId',
		}),

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

	methods: {
		...mapActions({
			addOrderProduct: 'orders/addOrderProduct',
		}),

		prepareOrder (event) {
			event.stopPropagation()

			const order = {
				product: [this.item],
				order_quantity: 1,
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
	.ProductsItem {
		position: relative;
		border-radius: 15px;
		overflow: hidden;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0) 75.34%);
		margin-bottom: 16px;
		&:hover {
			cursor: pointer;
		}

		img[lazy="loaded"] {
			border-radius: 15px;
		}

		&::before {
			content: "";
			display: block;
			padding-top: percentage(363/343);
		}

		&__top,
		&__lower {
			position: absolute;
			padding: 0 16px;
		}

		&__top {
			top: 16px;
			width: 100%;
		}

		&__lower {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			bottom: 16px;
		}

		&__category {
			display: inline-block;
			color: #6F6F6F;
			font-size: 12px;
			line-height: 21px;
			font-weight: 600;
			padding: 0 10px;
			height: 21px;
			background: #FFF;
			border-radius: 11.5px;
			margin-bottom: 8px;
		}

		&__price {
			display: inline-block;
			font-size: 14px;
			line-height: 17px;
			font-weight: 400;
			padding: 4px 8px;
			background: rgba(0, 0, 0, 0.4);
			border-radius: 6px;
		}

		&__name {
			color: #FFFFFF;
			font-size: 16px;
			line-height: 19px;
			font-weight: 600;
			margin-bottom: 8px;
		}

		&__details {
			display: inline-flex;
			color: #FFF;
			font-size: 14px;
			line-height: 17px;
		}

		&__details span:first-of-type {
			margin-right: 10px;
		}

		&__action {
			position: relative;
			display: inline-block;
			height: 49px;
			font-size: 14px;
			line-height: 49px;
			border: none;
			border-radius: 17.5px;
			padding: 0 10px;
			min-width: 124px;
			color: #FFF;
			overflow: hidden;
			background: rgba(0, 0, 0, 0.45);
		}

		&__action:disabled {
			background: rgba(0, 0, 0, 0.2);
		}

		.counter {
			background: rgba(0, 0, 0, 0.45);
			height: 42px;
			border-radius: 10px;

			&__minus,
			&__plus {
				height: 42px;
				width: 42px;
				background: none;
			}

			&__minus::before,
			&__plus::before,
			&__plus::after {
				background: #FFF;
			}

			&__value {
				color: #FFF;
				height: 42px;
				line-height: 42px;
			}
		}

		&--no-img {
			background: #FFF;
			box-shadow: 0px 7px 29px rgba(156, 167, 181, 0.31);
		}

		&--no-img &__category {
			background: #ECF0F4;
		}

		&--no-img &__name {
			color: #24242E;
			margin-bottom: 16px;
		}

		&--no-img &__price {
			color: #24242E;
			font-size: 14px;
			line-height: 17px;
			padding: 0;
			background: none;
		}

		&--no-img &__action {
			background: $blue;
		}

		&--no-img &__action:disabled {
			background: #81ADEF;
		}
	}

	.item-details {
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
	}
</style>
