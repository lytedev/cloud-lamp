import RGBColor from './RGBColor'
import Vue from 'vue';
import Vuex from 'vuex';

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
				host: 'pi-lamp',
				port: '3002',
				apiUrl: '/api/v1',
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
				let color: RGBColor = context.getters.lampColor
				let pins = context.getters.pins
				let url: string = context.getters.apiUrl
				let pigpioCommands = `p ${pins.red} ${color.red}\np ${pins.green} ${color.green}\np ${pins.blue} ${color.blue}`
				fetch(`${url}/raw-pigpio-commands`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors',
					redirect: 'follow',
					body: JSON.stringify({ commands: pigpioCommands }),
				})
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
