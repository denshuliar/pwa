<template>
	<div class="Menu">

		<!-- heading start -->

		<AppHeading
			v-if="client"
			:title="client.name"
			:subtitle="headingSubtitle"
		/>

		<!-- heading end -->

		<!-- content start -->

		<AppLoading
			v-if="productsLoading"
			style="padding: 0 16px;"
		/>

		<AppNoData
			v-else-if="!productsLoading && !productsFiltered.length"
			text="Sorry, no products at the moment :("
			style="padding: 0 16px;"
		/>

		<div
			v-else
			class="content"
		>
			<div class="container">
				<ProductsList
					:list="productsFiltered"
					:selectProduct="selectProduct"
				/>
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

import ProductsList from '../components/ProductsList.vue'

export default {
	components: {
		AppLoading,
		AppNoData,
		AppHeading,
		ProductsList,
	},

	computed: {
		...mapGetters({
			selectedCategory: 'categories/selectedCategory',

			products: 'products/products',
			productsLoading: 'products/productsLoading',
		}),

		headingSubtitle () {
			return this.selectedCategory ? this.getTranslation(this.selectedCategory.name) : 'Menu'
		},

		productsFiltered () {
			if (this.selectedCategory) {
				return this.products.filter((item) => this.selectedCategory.id === item.categories[0].id)
			}

			return this.products
		},
	},

	mounted () {
		if (!this.products.length) this.getProducts()
	},

	methods: {
		...mapActions({
			getProducts: 'products/getProducts',
		}),

		selectProduct (product) {
			this.$router.push({
				name: 'menu-item-details',
				params: {
					categoryId: product.categories[0].id,
					productId: product.id,
					selectedItem: product,
				},
			})
		},

		updateCategory (category) {
			this.selectedCategory = category
		},
	},
};
</script>

<style lang="scss">
	.category-list {
		padding: 0;
		margin: 0;
		list-style: none;

		&__item {
			display: flex;
			font-size: 18px;
			line-height: 20px;
			padding: 16px 0;
		}
	}
</style>
