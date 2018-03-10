leds = require './leds'
app = require './app'

leds.initialize()

app.listen leds
