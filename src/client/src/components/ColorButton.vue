<template lang="pug">
</template>

<script lang="ts">
import { Mutation } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator';
import RGBColor from '../RGBColor';

@Component({
	name: 'color-button'
})
export default class Home extends Vue {
	colorString!: string
	@Mutation setLampColor!: any

	get color (): RGBColor {
		const parts = this.colorString.split(',')
		return {
			red: parseInt(parts[0].trim()),
			green: parseInt(parts[0].trim()),
			blue: parseInt(parts[0].trim()),
		}
	}

	updateLampColor (colorKey: string, ev: any): any {
		this.setLampColor()
	}
}
</script>

<style lang="stylus">
</style>
