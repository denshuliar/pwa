<template>
	<div class="Languages">

		<!-- heading start -->

		<AppHeading
			title="Language"
			subtitle="Select your language"
		/>

		<!-- heading end -->

		<!-- content start -->

		<AppLoading
			v-if="languagesLoading"
			style="padding: 0 16px;"
		/>

		<AppNoData
			v-else-if="!languagesLoading && !languages.length"
			text="No available languages at the moment :("
			style="padding: 0 16px;"
		/>

		<div
			v-else
			class="content"
		>
			<div class="container">
				<div class="row">
					<div class="col">
						<LanguagesList
							:list="languages"
							:selectItem="selectLanguage"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- content end -->

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { setValue } from '../services/session'

import AppLoading from '../components/AppLoading.vue'
import AppNoData from '../components/AppNoData.vue'
import AppHeading from '../components/AppHeading.vue'

import LanguagesList from '../components/LanguagesList.vue'

export default {
	components: {
		AppLoading,
		AppNoData,
		AppHeading,

		LanguagesList,
	},

	beforeRouteEnter (to, from, next) {
		next((vm) => {
			vm.previousRoute = from
		})
	},

	data () {
		return {
			previousRoute: null,
		}
	},

	computed: {
		...mapGetters({
			languages: 'languages/languages',
			languagesLoading: 'languages/languagesLoading',
		}),
	},

	mounted () {
		if (!this.languages.length) this.getLanguages()
	},

	methods: {
		...mapActions({
			getLanguages: 'languages/getLanguages',
			updateSelectedLanguage: 'languages/updateSelectedLanguage',
		}),

		selectLanguage (language) {
			setValue('selectedLanguage', language)

			this.updateSelectedLanguage(language)

			this.$router.push({
				path: this.previousRoute.name ? this.previousRoute.name : '/categories',
			})
		},
	},
};
</script>

<style lang="scss">
	.Languages {
		padding-top: 24px;
	}
</style>
