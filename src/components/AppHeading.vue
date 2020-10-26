<template>
	<div class="AppHeading bottom-24">
		<div class="container">
			<div class="row">
				<div class="col">
					<h2 class="AppHeading__title">{{ title }}</h2>
					<h3 class="AppHeading__subtitle">{{ subtitle }}</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		'title',
		'subtitle',
	],
}
</script>

<style lang="scss" scoped>
	.AppHeading {
		&__title,
		&__subtitle {
			font-size: 24px;
			line-height: 29px;
			margin-bottom: 0;
		}

		&__title {
			color: #474747;
		}

		&__subtitle {
			color: #B5B5B5;
		}
	}
</style>
