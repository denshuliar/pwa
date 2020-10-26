<template>
	<div class="OrdersList">
		<OrdersItem
			v-if="newItem && newItem.products.length"
			:item="newItem"
			@click.native="selectItem(newItem, true)"
		/>

		<OrdersItem
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			@click.native="selectItem(item, false)"
		/>
	</div>
</template>

<script>
import OrdersItem from './OrdersItem.vue'

export default {
	props: [
		'newItem',
		'list',
		'selectItem',
	],

	components: {
		OrdersItem,
	},
}
</script>

<style lang="scss" scoped></style>
