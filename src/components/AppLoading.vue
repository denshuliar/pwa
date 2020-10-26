<template>
	<div class="AppLoading">
		<div
			v-if="type === 'ring'"
			class="AppLoading__ring"
		>
			<div :style="{ 'border-color': color }" />
			<div :style="{ 'border-color': color }" />
		</div>

		<span
			v-else
			class="AppLoading__text"
		>
			Loading...
		</span>
	</div>
</template>

<script>
export default {
	props: [
		'type',
		'color',
	],
}
</script>

<style lang="scss" scoped>
	.AppLoading {
		margin: 0 auto;
		padding: 0 16px;
	}

	@media (min-width: 576px) {
		.AppLoading {
			max-width: 540px;
		}
	}

	@media (min-width: 768px) {
		.AppLoading {
			max-width: 720px;
		}
	}

	@media (min-width: 992px) {
		.AppLoading {
			max-width: 960px;
		}
	}

	@media (min-width: 1200px) {
		.AppLoading {
			max-width: 1170px;
		}
	}

	.AppLoading__ring {
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 56px;
		height: 100%;

		div {
			opacity: 1;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 0;
			height: 0;
			border: 3px solid #fff;
			border-radius: 50%;
			transform: translate(-50%, -50%);
			animation: lds-ripple 1.5s infinite;
		}

		div:nth-child(2) {
			animation-delay: -0.75s;
		}
	}
</style>
