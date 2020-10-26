<template>
	<p class="AppNoData">{{ noDatatext }}</p>
</template>

<script>
export default {
	props: [
		'text',
	],

	computed: {
		noDatatext () {
			return this.text ? this.text : 'No data :('
		},
	},
}
</script>

<style lang="scss" scoped>
	.AppNoData {
		margin: 0 auto;
		padding: 0 16px;
	}
	@media (min-width: 576px) {
		.AppNoData {
			max-width: 540px;
		}
	}

	@media (min-width: 768px) {
		.AppNoData {
			max-width: 720px;
		}
	}

	@media (min-width: 992px) {
		.AppNoData {
			max-width: 960px;
		}
	}

	@media (min-width: 1200px) {
		.AppNoData {
			max-width: 1170px;
		}
	}
</style>
