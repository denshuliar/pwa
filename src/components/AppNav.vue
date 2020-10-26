<template>
	<div class="AppNav">
		<div class="container">
			<div class="row">
				<div class="col-12 text-right">
					<button
						class="AppNav__settings AppNav--action"
						@click="$router.push({ path: 'languages' })"
					>
						<GlobeIcon />
					</button>

					<button
						v-if="showCategories"
						class="AppNav__settings AppNav--action"
						@click="$router.push({ path: 'categories-modal' })"
					>
						<SlidersIcon />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const routesWithCategories = [
	'menu',
]

export default {
	components: {
		GlobeIcon: () => import('../assets/images/globe.svg'),
		SlidersIcon: () => import('../assets/images/sliders.svg'),
	},

	computed: {
		showCategories () {
			return routesWithCategories.includes(this.$route.name)
		},
	},
}
</script>

<style lang="scss" scoped>
	.AppNav {
		display: flex;
		justify-content: space-between;
		padding: 16px 0;

		&__search,
		&__settings {
			display: inline-block;
		}

		&__settings {
			margin-left: 20px;
		}

		&--action {
			display: inline-flex;
			border: none;
			background: none;
			padding: 0;
		}
	}
</style>
