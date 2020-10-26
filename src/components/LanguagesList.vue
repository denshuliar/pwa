<template>
	<ul class="LanguagesList">
		<LanguagesItem
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			@click.native="selectItem(item)"
		/>
	</ul>
</template>

<script>
import LanguagesItem from './LanguagesItem.vue'

export default {
	props: [
		'list',
		'selectItem',
	],

	components: {
		LanguagesItem,
	},
}
</script>

<style lang="scss" scoped>
	.LanguagesList {
		padding: 0;
		margin: 0;
		list-style: none;

		.LanguagesItem:not(:last-of-type) {
			margin-bottom: 16px;
		}
	}
</style>
