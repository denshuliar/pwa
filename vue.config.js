module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? './' : './',

	pwa: {
		themeColor: '#42b983',
		msTileColor: '#42b983',
		appleMobileWebAppCache: 'yes',
		manifestOptions: {
			background_color: '#42b983',
		},
	},

	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg')

		svgRule
			.uses
			.clear()

		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: "@import '~@/assets/styles/main.scss';",
			},
		},
	},
}
