<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view/>
	</div>
</template>

<style lang="stylus">
@import '~@/shared.styl'

html, body
	background #111
	color #fff

#app
	font-family 'Lato', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #ccc

#nav
	padding 30px

	a
		font-weight bold
		color $brand-primary-color

		&.router-link-exact-active
			color $brand-primary-color
</style>
