sys = require 'sys'
onoff = require 'onoff'
express = require 'express'

Gpio = onoff.Gpio

RED_LED_PIN = process.env.RED_LED_PIN or 16
GREEN_LED_PIN = process.env.GREEN_LED_PIN or 20
BLUE_LED_PIN = process.env.BLUE_LED_PIN or 21

try
	# might fail to handle the GPIO setup
	# especially on a development machine
	# (which probably doesn't have any GPIO pins)
	leds =
		r: new Gpio RED_LED_PIN
		g: new Gpio GREEN_LED_PIN
		b: new Gpio BLUE_LED_PIN

catch e
	console.log 'Failed to initialize GPIO pins', e
	sys.exit -1

console.log leds
