<template>
	<div class="OrdersProductsList">
		<OrdersProductsItem
			class="order-item-details"
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			:isNewItem="isNewItem"
			@click.native="selectItem(item)"
		/>
	</div>
</template>

<script>
import OrdersProductsItem from './OrdersProductsItem.vue'

export default {
	props: [
		'isNewItem',
		'list',
		'selectItem',
	],

	components: {
		OrdersProductsItem,
	},
}
</script>

<style lang="scss" scoped></style>
