<template>
	<div class="CategoriesModal">

		<!-- app nav back start -->

		<AppNavBack title="Category" />

		<!-- app nav back end -->

		<!-- content start -->

		<AppLoading v-if="categoriesLoading" />

		<AppNoData v-else-if="!categoriesLoading && !categories.length" />

		<div v-else class="container">
			<div class="row">
				<div class="col-12">
					<CategoriesList
						:list="categories"
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

import AppNavBack from '../components/AppNavBack.vue'
import AppLoading from '../components/AppLoading.vue'
import AppNoData from '../components/AppNoData.vue'

import CategoriesList from '../components/CategoriesList.vue'

export default {
	components: {
		AppNavBack,
		AppLoading,
		AppNoData,

		CategoriesList,
	},

	computed: {
		...mapGetters({
			categories: 'categories/categories',
			categoriesLoading: 'categories/categoriesLoading',
		}),
	},

	beforeRouteEnter (to, from, next) {
		next((vm) => {
			vm.previousRoute = from
		})
	},

	data () {
		return {
			previousRoute: null,
		}
	},

	mounted () {
		if (!this.categories.length) this.getCategories()
	},

	methods: {
		...mapActions({
			getCategories: 'categories/getCategories',
			updateSelectedCategory: 'categories/updateSelectedCategory',
		}),

		selectCategory (category = null) {
			this.updateSelectedCategory(category)

			this.$router.push('/menu')
		},
	},
}
</script>

<style lang="scss" scoped>
	.CategoriesModal {
		padding-bottom: 70px;
	}
</style>
