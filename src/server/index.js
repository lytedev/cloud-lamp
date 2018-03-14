const fs = require('fs')
const express = require('express')
const ws = require('express-ws')
const pkg = require('./package.json')

const Router = express.Router

let PIGPIO_FILE = process.env.PIGPIO_FILE || '/dev/pigpio'
let PORT = process.env.PORT || 3002
let HOST = process.env.HOST || '0.0.0.0'

const app = express()

let pinMap = {
	'red': 21,
	'green': 16,
	'blue': 15,
}

app.get('/', (req, res, next) => {
	return res.json({ name: pkg.name, version: pkg.version })
})

router = new Router()

router.get('/', (req, res, next) => {
	return res.json({ name: pkg.name, version: pkg.version })
})

router.param('pinValue', (req, res, next, val) => {
	req.pinValue = val
	// console.log('req.pinValue', req.pinValue)
	next()
})

router.param('pin', (req, res, next, val) => {
	req.rawPin = val
	req.pin = pinMap[val]
	// console.log('req.pin', req.pin)
	next()
})

router.get('/set-pin/:pin/:pinValue', (req, res, next) => {
	let data = `p ${req.pin} ${req.pinValue}`
	fs.writeFile(PIGPIO_FILE, data, (err) => {
		if (err)
			console.log(`Failed to write ${data} to ${PIGPIO_FILE}`)
		else
			console.log(`Wrote ${req.pinValue} to ${req.rawPin}`)
	})
	return res.json({ message: 'Success!', code: 200 })
})

router.post('/set-pin/:pin/:pinValue', (req, res, next) => {
	let data = `p ${req.pin} ${req.pinValue}`
	fs.writeFile(PIGPIO_FILE, data, (err) => {
		if (err)
			console.log(`Failed to write ${data} to ${PIGPIO_FILE}`)
	})
	return res.json({ message: 'Success!', code: 200 })
})

app.use('/api/v1', router)

app.listen(PORT, function () {
	console.log(`Started listening on ${HOST}:${PORT}`)
})
