import RGBColor from './RGBColor'
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

let defaults = {
	color: {
		red: 255,
		green: 255,
		blue: 255,
	},
	pins: {
		red: 20,
		green: 16,
		blue: 21,
	}
}

let defaultRed = 255
let defaultGreen = 255
let defaultBlue = 255

export default function CloudLampStore() {
	return new Vuex.Store({
		state: {
			cloudLampServer: {
				protocol: 'http',
				host: 'cloudlamp',
				port: '3002',
				apiUrl: '/api/v1',
				wsProtocol: 'ws',
				wsApiUrl: '/ws-api/v1',
				websocket: <WebSocket>{},
				ws_tracker: 0,
			},
			lampColor: <RGBColor>{
				red: defaults.color.red,
				green: defaults.color.green,
				blue: defaults.color.blue,
			},
			pins: {
				red: defaults.pins.red,
				green: defaults.pins.green,
				blue: defaults.pins.blue,
			},
		},
		getters: {
			websocket (state, getters) {
				let srv = state.cloudLampServer
				return srv.websocket instanceof WebSocket ? srv.websocket : getters.newWebsocket
			},
			newWebsocket (state, getters) {
				let srv = state.cloudLampServer
				console.log('NEW WEBSOCKET')
				Vue.set(srv, 'websocket', new WebSocket(getters.wsApiUrl + '/raw-pigpio-commands'))
				srv.websocket.addEventListener('open', (ev) => {
					state.cloudLampServer.ws_tracker++
					// srv.websocket = Object.assign({}, srv.websocket) // force notify changes?
					console.log('ws open')
					console.log(getters.isConnected)
				})
				return srv.websocket
			},
			isConnected (state, getters): boolean {
				let t = state.cloudLampServer.ws_tracker
				let ws = getters.websocket
				console.log('checking isConnected...')
				if (!(ws instanceof WebSocket)) {
					console.log('not a websocket')
					return false
				} else if (!('readyState' in ws)) {
					console.log('no ready state')
					return false
				} else if (ws.readyState !== ws.OPEN) {
					console.log('ready state not open')
					return false
				} else {
					console.log('connected')
					return true
				}
			},
			pins (state) {
				return state.pins
			},
			lampColor (state): RGBColor {
				return state.lampColor
			},
			apiUrl (state): string {
				var srv = state.cloudLampServer
				return srv.protocol + '://' + srv.host + ':' + srv.port + srv.apiUrl
			},
			wsApiUrl (state): string {
				var srv = state.cloudLampServer
				return srv.wsProtocol + '://' + srv.host + ':' + srv.port + srv.wsApiUrl
			},
		},
		mutations: {
			setSingleLampColorValue (state, payload) {
				if (payload.key == 'red')
					state.lampColor.red = payload.value
				else if (payload.key == 'green')
					state.lampColor.green = payload.value
				else if (payload.key == 'blue')
					state.lampColor.blue = payload.value
			},
			setLampColor(state, newLampColor: RGBColor) {
				state.lampColor.red = newLampColor.red
				state.lampColor.green = newLampColor.green
				state.lampColor.blue = newLampColor.blue
			},
		},
		actions: {
			postLampColor (context) {
				let color: RGBColor = Object.assign({}, context.getters.lampColor)
				color.red = Math.abs(color.red - 255)
				color.green = Math.abs(color.green - 255)
				color.blue = Math.abs(color.blue - 255)
				let pins = context.getters.pins
				let url: string = context.getters.apiUrl
				let pigpioCommands = `p ${pins.red} ${color.red}\np ${pins.green} ${color.green}\np ${pins.blue} ${color.blue}`
				let ws = context.getters.websocket
				/*fetch(`${url}/raw-pigpio-commands`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors',
					redirect: 'follow',
					body: JSON.stringify({ commands: pigpioCommands }),
				})*/
				if (!('readyState' in ws)) {
					console.log('not a websocket', ws)
					return
				}
				if (ws.readyState !== ws.OPEN) {
					console.log('waiting for connection...', ws.readyState, ws)
				} else {
					console.log('sending commands', pigpioCommands.replace(/\n/g, '\\n'))
					ws.send(pigpioCommands)
				}
			},
			setSingleLampColorValue (context, payload) {
				context.commit('setSingleLampColorValue', payload)
				context.dispatch('postLampColor')
			},
			setLampColor(context, newLampColor: RGBColor) {
				context.commit('setLampColor', newLampColor)
				context.dispatch('postLampColor')
			},
		},
	})
}
