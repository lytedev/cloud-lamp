const fs = require('fs')
const express = require('express')
const ws = require('express-ws')
const bodyParser = require('body-parser')
const pkg = require('./package.json')

const Router = express.Router

let PIGPIO_FILE = process.env.PIGPIO_FILE || '/dev/pigpio'
let PORT = process.env.PORT || 3002
let HOST = process.env.HOST || '0.0.0.0'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let pinMap = {
	'red': 20,
	'green': 16,
	'blue': 21,
}

app.use(express.static('/static'))

app.get('/', (req, res, next) => {
	return res.json({ name: pkg.name, version: pkg.version })
})

router = new Router()

router.get('/', (req, res, next) => {
	return res.json({ name: pkg.name, version: pkg.version })
})

router.param('pinValue', (req, res, next, val) => {
	// TODO: if activeLow, rotate around 255, the max pin value
	req.originalPinValue = val
	req.pinValue = Math.abs(val - 255)
	next()
})

router.param('pin', (req, res, next, val) => {
	req.pinName = val
	req.pin = pinMap[val]
	next()
})

router.get('/pin-map', (req, res, next) => {
	return res.json(pinMap)
})

router.post('/raw-pigpio-commands', (req, res, next) => {
	console.log('Raw:', req.body.commands.replace('\n', '\\n'))
	fs.appendFile(PIGPIO_FILE, req.body.commands + '\n', (err) => {
		if (err) {
			res.status(500)
			return res.json({ message: `Error: ${err}`, code: 500 })
		} else {
			res.status(200)
			return res.json({ message: `Success! (${req.body.commands.trim().replace('\n', '\\n')} > ${PIGPIO_FILE})`, code: 200 })
		}
	})
	// next()
})

router.post('/set-pin/:pin/:pinValue', (req, res, next) => {
	let data = `p ${req.pin} ${req.pinValue}\n`
	fs.appendFile(PIGPIO_FILE, data, (err) => {
		if (err) {
			// console.log(`Failed to write ${data.trim()} to ${PIGPIO_FILE}: ${err}`)
			res.status(500)
			return res.json({ message: `Error: ${err}`, code: 500 })
		} else {
			// console.log(`Wrote ${req.pinValue} to ${req.pinName} (${data.trim()} > ${PIGPIO_FILE})`)
			res.status(200)
			return res.json({ message: `Success! Set ${req.pin} to ${req.originalPinValue}.`, code: 200 })
		}
	})
})

app.use('/api/v1', router)

app.listen(PORT, function () {
	console.log(`Started listening on ${HOST}:${PORT}`)
})
