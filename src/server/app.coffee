# imports
express = require 'express'
pkg = require './package.json'
leds = require './leds.coffee'

# classes
Router = express.Router

# defaults, constants, and environment variables
PORT = process.env.PORT or 3002
HOST = process.env.HOST or '0.0.0.0'

module.exports =
	listen: () ->
		leds.initialize()

		app = express()

		app.get '/', (req, res, next) -> res.send "cloud-lamp server #{pkg.version}"

		router = new Router()

		router.param 'leds', (req, res, next, value) ->
			req.leds = leds.getLeds value
			next()

		router.param 'state', (req, res, next, value) ->
			vs = value.toString()
			if vs == 'true' or vs == '1' or vs == 'on' or vs == 'high'
				req.value = 0
			else req.value = 1
			next()

		router.get '/leds/:leds', (req, res, next) -> res.json leds.toJson req.leds

		router.post '/leds/:leds/:state', (req, res, next) ->
			for led of req.leds
				console.log 'led post', req.leds[led]
			req.leds[led].writeSync(req.value) for led of req.leds
			res.json leds.toJson req.leds

		app.use '/api/v1', router

		app.listen PORT, HOST, {}, ->
			console.log "Listening on #{HOST}:#{PORT}"
