<template lang="pug">
.page#page--home
	.field
		label.tint-red Red
			span {{ lampColors.red }}
		input(type="range" step="1" min="0" max="255" :value="lampColors.red" @input="updateLampColor('red', $event)")
	.field
		label.tint-green Green
			span {{ lampColors.green }}
		input(type="range" step="1" min="0" max="255" :value="lampColors.green" @input="updateLampColor('green', $event)")
	.field
		label.tint-blue Blue
			span {{ lampColors.blue }}
		input(type="range" step="1" min="0" max="255" :value="lampColors.blue" @input="updateLampColor('blue', $event)")
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
	computed: {
		...mapGetters(['lampColors'])
	},
	methods: {
		updateLampColor: (colorKey, ev) => {
			// console.log(colorKey, ev.target.value)
		}
	}
})
export default class Home extends Vue {}
</script>

<style lang="stylus">
#page--home
	display flex
	flex-direction column
	justify-content center
	align-items center
	padding 2em 3em 1em 3em

	.field
		display flex
		flex-direction column
		justify-content center
		align-items flex-start
		width 100%

		label
			display flex
			text-transform uppercase
			font-size 1.6rem
			text-align left
			flex-direction row
			justify-content space-between
			align-items center
			width 100%

			&.tint-red
				color #600

			&.tint-green
				color #060

			&.tint-blue
				color #006

input[type="range"]
	width 100%
	color inherit
	margin-bottom 1em
</style>
