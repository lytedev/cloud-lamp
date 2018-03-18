<template lang="pug">
#app
	header#site-header
		nav#nav
			.nav-left
				router-link#logo(to="/")
					strong Cloud
					| Lamp
					span#cloud(:style="cloudStyle")
						i.fa.fas.fa-cloud
	router-view
	//- | {{ cloudStyle }}
</template>

<script lang="ts">
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import RGBColor from './RGBColor';

fontawesome.library.add(solid.faCloud)

@Component({
	name: 'app'
})
export default class App extends Vue {
	@Getter lampColor!: RGBColor

	get cloudStyle(): Object {
		return { color: `rgb(${this.lampColor.red}, ${this.lampColor.green}, ${this.lampColor.blue})` }
	}
}
</script>

<style lang="stylus">
@import '~@/shared.styl'

*, *::before, *::after
	margin 0
	padding 0
	box-sizing border-box

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
	justify-content center

	router-link
		display block

	#logo
		font-size 3.2rem
		display block
		padding 0.5em
		color inherit
		text-decoration none
		font-weight 300
		line-height 1.4em
		letter-spacing -0.2rem

		svg
			margin-left 0.25em

	a
		color $brand-primary-color

		&.router-link-exact-active
			color $brand-primary-color
</style>
