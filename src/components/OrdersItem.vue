<template>
	<div class="OrdersItem">
		<div class="OrdersItem__img">
			<img
				v-lazy="{
					'src': getImage(),
					'error': client.cover_image
				}"
				alt="dish"
				class="img--bg"
			/>
		</div>

		<div class="OrdersItem__top">
			<div class="row">
				<div class="col-6">
					<span class="OrdersItem__name">{{ getName }}</span>
				</div>

				<div class="col-6 text-right">
					<span class="OrdersItem__price">{{ currency }} {{ getTotalPrice() }}</span>
				</div>
			</div>
		</div>

		<div class="OrdersItem__lower">
			<div class="row">
				<div class="col-6">
					<span
						class="OrdersItem__status"
						:class="{
							'status--new': !this.item.status,
							'status--progress': this.item.status === 'CREATED'
						}"
					>
						{{ !this.item.status ? 'New' : 'Accepted' }}
					</span>

					<span class="OrdersItem__circle"></span>
					<span class="OrdersItem__count">{{ getTotalCountOfDishes() }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		'item',
	],

	computed: {
		getName () {
			return this.item.uuid ? `Order #${this.item.uuid.substr(this.item.uuid.length - 3).toUpperCase()}` : 'New order'
		},
	},

	methods: {
		getImage () {
			return this.item.products[0].product[0].images[0]
		},

		getTotalPrice () {
			let price = 0

			if (this.item.products) {
				this.item.products.forEach((product) => {
					price += product.product[0].price * product.order_quantity
				})
			}

			return price
		},

		getTotalCountOfDishes () {
			let count = 0

			if (this.item.products) {
				this.item.products.forEach((product) => {
					count += product.order_quantity
				})
			}

			return `${count} dishes`
		},
	},
}
</script>

<style lang="scss" scoped>
	.OrdersItem {
		background: #FFFFFF;
		box-shadow: 0px 7px 25px rgba(102, 137, 163, 0.2);
		border-radius: 15px;
		margin-bottom: 16px;
		padding: 10px 10px 24px 10px;
		overflow: hidden;

		img[lazy="loaded"] {
			border-radius: 10px;
		}

		&__img {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
		}

		&__img img {
			z-index: 0;
		}

		&__img::before {
			content: "";
			display: block;
			padding-top: percentage(100/323);
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0) 75.34%);
			z-index: 1;
			position: relative;
		}

		&__top {
			margin-top: 16px;
			font-weight: 600;
			line-height: 19px;
		}

		&__lower {
			margin-top: 8px;
			font-size: 14px;
			line-height: 17px;
			font-weight: 500;
		}

		&__circle {
			display: inline-block;
			vertical-align: middle;
			margin: 0 8px;
			background: #9CA7B5;
			height: 4px;
			width: 4px;
			border-radius: 50%;
		}

		&__count {
			color: #9CA7B5;
		}
	}
</style>
