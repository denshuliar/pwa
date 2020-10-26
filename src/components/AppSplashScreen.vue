<template>
	<div
		class="AppSplashScreen"
		v-if="client"
	>
		<img
			class="AppSplashScreen__img"
			:src="client.welcome_screen"
			alt="splashscreen"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.AppSplashScreen {
		min-height: 100vh;
		width: 100%;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		background-color: white;

		&__img {
			display: block;
			margin: auto;
			max-height: 500px;
			max-width: calc(100% - 32px);
		}
	}
</style>
