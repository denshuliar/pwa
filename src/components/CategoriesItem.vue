<template>
	<div
		:class="{
			'CategoriesItem--default': !type,
			'CategoriesItem--outlined': type === 'outlined'
		}"
	>
		<h3
			:class="{
				'CategoriesItem--default__title': !type,
				'CategoriesItem--outlined__title': type === 'outlined'
			}"
		>
			<span>{{ name }}</span>
			<span>{{ getDishesCount() }}</span>
		</h3>
	</div>
</template>

<script>
export default {
	props: [
		'type',
		'item',
		'products',
	],

	computed: {
		name () {
			return this.item ? this.getTranslation(this.item.name) : 'All'
		},
	},

	methods: {
		getDishesCount () {
			if (this.item && this.products && this.products.length) {
				const count = this.products
					.filter(({ categories }) => categories[0].id === this.item.id)
					.length

				return `${count} items`
			} else if (this.products && this.products.length) {
				const count = this.products.length

				return `${count} items`
			}

			return null
		},
	},
}
</script>

<style lang="scss" scoped>
	.CategoriesItem {
		&--default {
			&__title {
				font-size: 18px;
				line-height: 20px;
				padding: 16px 0;
				font-weight: 500;
			}

			&:hover {
				cursor: pointer;
			}
		}

		&--outlined {
			position: relative;
			box-shadow: 0px 7px 25px rgba(102, 137, 163, 0.2);
			border-radius: 10px;
			margin-bottom: 12px;
			padding: 0 24px;

			&:hover {
				cursor: pointer;
			}

			&__title {
				font-size: 18px;
				line-height: 22px;
				font-weight: 600;
				min-height: 64px;
				margin-bottom: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&__title span:first-of-type {
				width: calc(100% - 100px);
			}

			&__title span:last-of-type {
				color: #9CA7B5;
				font-size: 18px;
				font-weight: 400;
			}
		}
	}
</style>
