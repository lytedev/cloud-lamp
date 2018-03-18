<template lang="pug">
#app
	header#site-header
		nav#nav
			.nav-left
				router-link#logo.nav-item(to="/")
					strong Cloud
					| Lamp
			.nav-right
				span#cloud.fa-layers.fa-fw.fa-2x.nav-item(:style="cloudStyle")
					i.fa.fas.fa-cloud
					i.fa.fas.fa-ban(data-fa-transform="shrink-6 down-1" :style="disconnectedStyle")
	router-view
	//- | {{ cloudStyle }}
</template>

<script lang="ts">
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import RGBColor from './RGBColor';

fontawesome.library.add(solid.faCloud, solid.faBan)

@Component({
	name: 'app'
})
export default class App extends Vue {
	@Getter lampColor!: RGBColor
	@Getter isConnected!: boolean

	get cloudStyle(): Object {
		return { color: this.isConnected ? `rgb(${Math.max(17, this.lampColor.red)}, ${Math.max(17, this.lampColor.green)}, ${Math.max(17, this.lampColor.blue)})` : '#fff' }
	}

	get disconnectedStyle(): Object {
		return { color: '#f30', visibility: this.isConnected ? 'visible' : 'hidden' }
	}
}
</script>

<style lang="stylus">
@import '~@/shared.styl'

*, *::before, *::after
	margin 0
	padding 0
	box-sizing border-box

.fa-layers
	box-sizing content-box

html, body
	background #fff
	color #333

html
	font-size 62.5%

#app
	font-family "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
	font-size 1.8rem
	line-height 1.4em
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	min-height 100vh
	display flex
	flex-direction column
	justify-content flex-start
	align-items center

.page
	flex 1
	display flex
	flex-direction column
	justify-content flex-start
	align-items center

#site-header
	width 100%

#nav
	background #111
	color #fff
	display flex
	justify-content space-between
	align-items center

	router-link
		display block

	#logo
		font-size 3.2rem

	.nav-item
		display block
		padding 0.5em
		color #fff
		text-decoration none
		font-weight 300
		line-height 1.4em
		letter-spacing -0.2rem
</style>
