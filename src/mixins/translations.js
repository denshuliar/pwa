import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
	computed: {
		...mapGetters({
			selectedLanguage: 'languages/selectedLanguage',
		}),
	},

	methods: {
		getTranslation (element) {
			if (this.selectedLanguage && this.selectedLanguage.code) {
				if (element[this.selectedLanguage.code]) {
					return element[this.selectedLanguage.code]
				}
			}

			return element['en']
		},
	},
})
