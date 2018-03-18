<template lang="pug">
button.color-button(@click='updateLampColor' :style='style')
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator';
import RGBColor from '../RGBColor';

@Component({
	name: 'color-button'
})
export default class Home extends Vue {
	@Prop() colorString!: string
	@Prop({ default: '' }) text!: string
	@Prop() renderColor!: string
	@Action setLampColor!: any

	get style () {
		return { backgroundColor: this.renderColor }
	}

	get color (): RGBColor {
		const parts = this.colorString.split(',')
		return {
			red: parseInt(parts[0].trim()),
			green: parseInt(parts[1].trim()),
			blue: parseInt(parts[2].trim()),
		}
	}

	updateLampColor () {
		console.log(this.color)
		this.setLampColor(this.color)
	}
}
</script>

<style lang="stylus">
.color-button
	border 0
	flex 1
	min-width 20%
	outline 0
</style>
