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
			if value of leds then req.leds = leds.getLeds value
			next()

		router.param 'state', (req, res, next, value) ->
			vs = value.toString()
			if vs == 'true' or vs == '1' or vs == 'on' then req.value = 0
			else req.value = 1
			next()

		router.get '/leds/:leds', (req, res, next) -> res.json req.leds

		router.post '/leds/:led/:state', (req, res, next) ->
			led.writeSync req.value for led in req.leds
			if req.led instanceof Gpio
				req.led._currentValue = req.led.readSync()
			res.send JSON.stringify req.led

		app.use '/api/v1', router

		app.listen PORT, HOST, {}, ->
			console.log "Listening on #{HOST}:#{PORT}"
