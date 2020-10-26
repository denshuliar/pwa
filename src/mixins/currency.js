import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
	computed: {
		...mapGetters({
			client: 'client/client',
			clientLoading: 'client/clientLoading',
		}),

		currency () {
			if (this.client && this.client.currency) {
				return this.client.currency
			}

			return ''
		},
	},
})
