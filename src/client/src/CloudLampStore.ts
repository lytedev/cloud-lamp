import RGBColor from './RGBColor'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let defaultRed = 255
let defaultGreen = 255
let defaultBlue = 255

export default function CloudLampStore() {
	return new Vuex.Store({
		state: {
			cloudLampServer: {
				host: 'http://pi-lamp:3002',
			},
			lampColor: <RGBColor>{
				red: defaultRed,
				green: defaultGreen,
				blue: defaultBlue,
			},
		},
		getters: {
			lampColor (state): RGBColor {
				return state.lampColor
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

		},
	})
}
