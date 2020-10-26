<template>
	<div class="AppTabs">
		<router-link
			v-for="(tab, index) in tabs"
			:key="index"
			:to="{
				path: tab.to,
			}"
		>
			<button
				class="AppTabs__action"
				:class="{
					'AppTabs__action--active': $route.name === tab.to
				}"
			>
				<span
					v-if="index === 1 && newOrder.products.length"
					class="bouncing-circle"
				/>

				<keep-alive>
					<component v-bind:is="tab.icon" />
				</keep-alive>

				<span>{{ tab.name }}</span>
			</button>
		</router-link>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	components: {
		MenuIcon: () => import('../assets/images/menu.svg'),
		BagIcon: () => import('../assets/images/bag.svg'),
		BellIcon: () => import('../assets/images/bell.svg'),
	},

	computed: {
		...mapGetters({
			newOrder: 'orders/newOrder',
		}),
	},

	data () {
		return {
			tabs: [
				{
					to: 'menu',
					name: 'Menu',
					icon: 'MenuIcon',
				},
				{
					to: 'orders',
					name: 'Orders',
					icon: 'BagIcon',
				},
				{
					to: 'waiter',
					name: 'Waiter',
					icon: 'BellIcon',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
	.AppTabs {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 1170px;
		z-index: 5;
		background: #FFFFFF;
		min-height: 83px;
		padding: 9px 0 0 0;
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
	}

	@media only screen and (min-width: 1200px){
		.AppTabs {
			border-radius: 10px 10px 0 0;
		}
	}

	.AppTabs {
		a {
			text-decoration: none;
		}

		&__action {
			position: relative;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			width: 94px;
			height: 50px;
			padding: 0;
			border: none;
			background: none;

			svg {
				path {
					stroke: #949494;
				}
			}

			&--active {
				svg path {
					stroke: $blue;
				}

				span {
					color: $blue !important;
				}
			}
		}

		&__action span {
			color: #949494;
			font-size: 10px;
			line-height: 12px;
			font-weight: 600;
			margin-top: 5px;
		}

		.bouncing-circle {
			display: inline-block;
			height: 10px;
			width: 10px;
			border-radius: 50%;
			background: red;
			position: absolute;
			top: -6px;
			right: 33px;
			animation: bounce 1s infinite;
		}
	}

	@keyframes bounce {
		0% {
			transform: scale(1)
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
