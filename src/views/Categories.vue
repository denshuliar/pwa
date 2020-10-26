<template>
	<div class="Categories">

		<!-- heading start -->

		<AppHeading
			v-if="client"
			:title="client.name"
			subtitle="What to eat?"
		/>

		<!-- heading end -->

		<!-- content start -->

		<div class="content">
			<div class="container">
				<div class="row offset-16">

					<div v-if="categoriesLoading"
						class="col-12"
					>
						<AppLoading style="padding: 0;"/>
					</div>

					<div
						v-else-if="!categoriesLoading && !categories.length"
						class="col-12"
					>
						<AppNoData
							text="Sorry, no categories at the moment :("
							style="padding: 0;"
						/>
					</div>

					<CategoriesList
						v-else
						type="outlined"
						:list="categories"
						:products="products"
						:selectItem="selectCategory"
					/>
				</div>
			</div>
		</div>

		<!-- content end -->

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppHeading from '../components/AppHeading.vue'
import AppLoading from '../components/AppLoading.vue'
import AppNoData from '../components/AppNoData.vue'

import CategoriesList from '../components/CategoriesList.vue'

export default {
	components: {
		AppHeading,
		AppLoading,
		AppNoData,

		CategoriesList,
	},

	computed: {
		...mapGetters({
			products: 'products/products',
			productsLoading: 'products/productsLoading',

			categories: 'categories/categories',
			categoriesLoading: 'categories/categoriesLoading',
		}),
	},

	mounted () {
		if (!this.categories.length) this.getCategories()
		if (!this.products.length) this.getProducts()
	},

	methods: {
		...mapActions({
			getCategories: 'categories/getCategories',
			updateSelectedCategory: 'categories/updateSelectedCategory',

			getProducts: 'products/getProducts',
		}),

		selectCategory (category = null) {
			this.updateSelectedCategory(category)

			this.$router.push('/menu')
		},
	},
}
</script>

<style lang="scss"></style>
