# imports
express = require 'express'
Nanotimer = require 'nanotimer'
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
			req.stateValue = 'low'
			if vs == 'true' or vs == '1' or vs == 'on' or vs == 'high'
				req.stateValue = 'high'
			else if vs.indexOf('blink') > -1 or vs.indexOf('phase') > -1
				req.stateValue = vs
			next()

		router.get '/leds/:leds', (req, res, next) -> res.json leds.toJson req.leds

		router.post '/leds/:leds/:state', (req, res, next) ->
			for led of req.leds
				l = req.leds[led]
				state = req.stateValue
				l._timer.clearInterval() if l._timer?
				delete l['_timer']
				if state == 'low'
					l.writeSync 0
				else if state == 'high'
					l.writeSync 1
				else
					if state.startsWith 'blink'
						args = state.split ':'
						blinkTimeType = args.pop()
						blinkOffTime = parseInt args.pop()
						blinkOnTime = parseInt args.pop()
						l._timer = new Nanotimer()
						blinkOn = ->
							l.writeSync 1
						blinkOff = ->
							l.writeSync 0
						blink = ->
							blinkOn()
							l._timer.setTimeout blinkOff, '', blinkOnTime + blinkTimeType
						l._timer.setInterval blink, '', (blinkOffTime + blinkOnTime) + blinkTimeType
			res.json leds.toJson req.leds

		app.use '/api/v1', router

		app.listen PORT, HOST, {}, ->
			console.log "Listening on #{HOST}:#{PORT}"
