<template>
	<div class="CategoriesList">
		<div class="col-12">
			<CategoriesItem
				:type="type"
				:products="products"
				@click.native="selectItem()"
			/>
		</div>

		<div
			class="col-12"
			v-for="(category, index) in list"
			:key="index"
		>
			<CategoriesItem
				:type="type"
				:item="category"
				:products="products"
				@click.native="selectItem(category)"
			/>
		</div>
	</div>
</template>

<script>
import CategoriesItem from './CategoriesItem.vue'

export default {
	props: [
		'type',
		'list',
		'products',
		'selectItem',
	],

	components: {
		CategoriesItem,
	},
}
</script>

<style lang="scss" scoped>
	.CategoriesList {
		width: 100%;
	}
</style>
