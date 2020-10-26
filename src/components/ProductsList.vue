<template>
	<div class="row offset-16">
		<div
			class="col-md-6 col-lg-4"
			v-for="(item, index) in list"
			:key="index"
		>
			<ProductsItem
				:item="item"
				@click.native="selectProduct(item)"
			/>
		</div>
	</div>
</template>

<script>
import ProductsItem from './ProductsItem.vue'

export default {
	props: [
		'list',
		'selectProduct',
	],

	components: {
		ProductsItem,
	},
}
</script>

<style lang="scss" scoped></style>
