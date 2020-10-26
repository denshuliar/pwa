<template>
	<div class="AppNavBack">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="AppNavBack__inner text-center">
						<button
							class="AppNavBack__action"
							@click="goBack()"
						>
							<BackIcon />
							<span>Back</span>
						</button>

						<h3
							v-if="title"
							class="AppNavBack__title"
						>
							{{ title }}
						</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		'title',
	],

	components: {
		BackIcon: () => import('../assets/images/back.svg'),
	},

	methods: {
		goBack () {
			this.$router.go(-1)
		},
	},
}
</script>

<style lang="scss" scoped>
	.AppNavBack {
		padding: 16px 0px;

		&__inner {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			padding: 0 70px;
			min-height: 24px;
		}

		&__action {
			position: absolute;
			top: 0;
			left: 0px;
			display: flex;
			align-items: center;
			padding: 0;
			border: none;
			background: none;
		}

		&__action span {
			margin-left: 6px;
		}

		&__title {
			color: #333333;
			font-size: 18px;
			line-height: 20px;
			font-weight: 600;
			margin-bottom: 0;
		}
	}
</style>
