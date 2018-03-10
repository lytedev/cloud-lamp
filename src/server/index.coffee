process = require 'process'
onoff = require 'onoff'
express = require 'express'

Router = express.Router
Gpio = onoff.Gpio

PORT = process.env.PORT or 3002
HOST = process.env.HOST or '0.0.0.0'
RED_LED_PIN = process.env.RED_LED_PIN or 16
GREEN_LED_PIN = process.env.GREEN_LED_PIN or 20
BLUE_LED_PIN = process.env.BLUE_LED_PIN or 21

leds = {}
try
	# might fail to handle the GPIO setup
	# especially on a development machine
	# (which probably doesn't have any GPIO pins)
	leds =
		r: new Gpio RED_LED_PIN, 'out'
		g: new Gpio GREEN_LED_PIN, 'out'
		b: new Gpio BLUE_LED_PIN, 'out'

catch e
	console.log 'Failed to initialize GPIO pins', e
	process.exit -1

process.on 'SIGINT', ->
	for led in leds
		leds[led].unexport()

app = express()

router = new Router()

router.use (req, res, next) ->
	next()

router.param 'led', (req, res, next, value) ->
	if value of leds
		req.led = leds[value]

router.get 'leds/:led', (req, res, next) ->
	console.log req.led
	next()

app.get '/api/v1'

app.listen PORT, HOST, {}, ->
	console.log "Listening on 0.0.0.0: #{PORT}"
