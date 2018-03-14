import RGBColor from './RGBColor'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function CloudLampStore() {
	return new Vuex.Store({
		state: {
			lampColors: {
				red: 255,
				green: 255,
				blue: 255,
			},
		},
		getters: {
			lampColors (state): RGBColor {
				return state.lampColors
			},
		},
		mutations: {

		},
		actions: {

		},
	})
}
