# imports
_ = require 'lodash'
process = require 'process'
onoff = require 'onoff'

# classes
Gpio = onoff.Gpio

# defaults, constants, and environment variables
RED_LED_PIN = process.env.RED_LED_PIN or 20
GREEN_LED_PIN = process.env.GREEN_LED_PIN or 16
BLUE_LED_PIN = process.env.BLUE_LED_PIN or 21

leds = {}

module.exports =
	leds: leds

	getLeds: (s) ->
		if s == '*' then leds
		else if s.indexOf(',') > -1 then _.pick leds, s.split ','
		else if s of leds then { "#{s}": leds[s] }
		else {}

	toJsonString: (leds) ->
		JSON.stringify @toJson leds

	toJson: (leds) ->
		for led of leds
			leds[led]._currentValue = leds[led].readSync()
		leds

	initialize: ->
		# handle Ctrl-C/SIGINT
		process.on 'SIGINT', ->
			try
				for led of leds
					leds[led].unexport()
				process.exit()
			catch e
				console.log e

		try
			# might fail to handle the GPIO setup
			# especially on a development machine
			# (which probably doesn't have any GPIO pins)
			leds =
				r: new Gpio RED_LED_PIN, 'high', 'both', { activeLow: false }
				g: new Gpio GREEN_LED_PIN, 'high', 'both', { activeLow: false }
				b: new Gpio BLUE_LED_PIN, 'high', 'both', { activeLow: false }
		catch e
			console.log 'Failed to initialize GPIO pins', e
			process.exit -1

for f of module.exports
	if typeof module.exports[f] == 'function'
		module.exports[f].bind module.exports
