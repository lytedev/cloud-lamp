<template lang="pug">
.page#page--home
	.color-sliders
		.field
			label.tint-red Red
				span {{ lampColor.red }}
			input(type="range" step="1" min="0" max="255" :value="lampColor.red" @input="updateLampColor('red', $event)")
		.field
			label.tint-green Green
				span {{ lampColor.green }}
			input(type="range" step="1" min="0" max="255" :value="lampColor.green" @input="updateLampColor('green', $event)")
		.field
			label.tint-blue Blue
				span {{ lampColor.blue }}
			input(type="range" step="1" min="0" max="255" :value="lampColor.blue" @input="updateLampColor('blue', $event)")
	.palette
		color-button(:color="255,255,255")
</template>

<script lang="ts">
import { Getter, Mutation } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import RGBColor from '@/RGBColor'
import ColorButton from '@/components/ColorButton.vue'

@Component({
	components: {
		ColorButton
	},
	name: 'home',
})
export default class Home extends Vue {
	@Getter lampColor!: RGBColor

	@Mutation setSingleLampColorValue!: any

	updateLampColor (colorKey: string, ev: any): any {
		this.setSingleLampColorValue({ key: colorKey, value: ev.target.value })
	}
}
</script>

<style lang="stylus">
#page--home
	display flex
	flex-direction column
	justify-content center
	align-items center
	padding 2em 3em 1em 3em
	max-width 500px
	margin 0 auto

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
	height 3em
	color inherit
	margin-bottom 2em
</style>
