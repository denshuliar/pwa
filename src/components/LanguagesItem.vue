<template>
	<li class="LanguagesItem">
		{{ item.value }}
	</li>
</template>

<script>
export default {
	props: [
		'item',
	],
}
</script>

<style lang="scss" scoped>
	.LanguagesItem {
		letter-spacing: -0.0241176em;
		color: $blue;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
		padding: 0px 40px;
		height: 56px;
		line-height: 56px;
		background: $blue-transparent;
		border-radius: 10px;

		&:hover {
			cursor: pointer;
		}
	}
</style>
