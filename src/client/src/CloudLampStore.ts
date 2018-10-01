import RGBColor from './RGBColor';
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const defaults = {
	color: {
		red: 255,
		green: 255,
		blue: 255,
	},
	pins: {
		red: 20,
		green: 16,
		blue: 21,
	},
};

const defaultRed = 255;
const defaultGreen = 255;
const defaultBlue = 255;

const hostPieces = window.location.host.split(':');
const host = hostPieces[0];
const port = hostPieces.length < 2 ? 3002 : parseInt(hostPieces[1]);

export default function CloudLampStore() {
	return new Vuex.Store({
		state: {
			cloudLampServer: {
				host,
				port,
				protocol: 'http',
				apiUrl: '/api/v1',
				wsProtocol: 'ws',
				wsApiUrl: '/ws-api/v1',
				websocket: {} as WebSocket,
				ws_tracker: 0,
			},
			lampColor: {
				red: defaults.color.red,
				green: defaults.color.green,
				blue: defaults.color.blue,
			} as RGBColor,
			pins: {
				red: defaults.pins.red,
				green: defaults.pins.green,
				blue: defaults.pins.blue,
			},
		},
		getters: {
			websocket(state, getters) {
				const srv = state.cloudLampServer;
				return srv.websocket instanceof WebSocket ? srv.websocket : getters.newWebsocket;
			},
			newWebsocket(state, getters) {
				const srv = state.cloudLampServer;
				// console.log('NEW WEBSOCKET');
				Vue.set(srv, 'websocket', new WebSocket(getters.wsApiUrl + '/raw-pigpio-commands'));
				srv.websocket.addEventListener('open', (ev) => {
					state.cloudLampServer.ws_tracker++;
					// srv.websocket = Object.assign({}, srv.websocket) // force notify changes?
					// console.log('ws open')
					// console.log(getters.isConnected)
				});
				return srv.websocket;
			},
			isConnected(state, getters): boolean {
				const t = state.cloudLampServer.ws_tracker;
				const ws = getters.websocket;
				if (!(ws instanceof WebSocket)) {
					return false;
				} else if (!('readyState' in ws)) {
					return false;
				} else if (ws.readyState !== ws.OPEN) {
					return false;
				} else {
					return true;
				}
			},
			pins(state) {
				return state.pins;
			},
			lampColor(state): RGBColor {
				return state.lampColor;
			},
			apiUrl(state): string {
				const srv = state.cloudLampServer;
				return srv.protocol + '://' + srv.host + ':' + srv.port + srv.apiUrl;
			},
			wsApiUrl(state): string {
				const srv = state.cloudLampServer;
				return srv.wsProtocol + '://' + srv.host + ':' + srv.port + srv.wsApiUrl;
			},
		},
		mutations: {
			setSingleLampColorValue(state, payload) {
				if (payload.key === 'red') {
					state.lampColor.red = payload.value;
				} else if (payload.key === 'green') {
					state.lampColor.green = payload.value;
				} else if (payload.key === 'blue') {
					state.lampColor.blue = payload.value;
				}
			},
			setLampColor(state, newLampColor: RGBColor) {
				state.lampColor.red = newLampColor.red;
				state.lampColor.green = newLampColor.green;
				state.lampColor.blue = newLampColor.blue;
			},
		},
		actions: {
			postLampColor(context) {
				const color: RGBColor = Object.assign({}, context.getters.lampColor);
				color.red = Math.abs(color.red - 255);
				color.green = Math.abs(color.green - 255);
				color.blue = Math.abs(color.blue - 255);
				const pins = context.getters.pins;
				const url: string = context.getters.apiUrl;
				const pigpioCommands = `p ${pins.red} ${color.red}\np ${pins.green} ${color.green}\np ${pins.blue} ${color.blue}`;
				const ws = context.getters.websocket;
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
					// console.log('not a websocket', ws);
					return;
				}
				if (ws.readyState !== ws.OPEN) {
					// console.log('waiting for connection...', ws.readyState, ws);
				} else {
					// console.log('sending commands', pigpioCommands.replace(/\n/g, '\\n'));
					ws.send(pigpioCommands);
				}
			},
			setSingleLampColorValue(context, payload) {
				context.commit('setSingleLampColorValue', payload);
				context.dispatch('postLampColor');
			},
			setLampColor(context, newLampColor: RGBColor) {
				context.commit('setLampColor', newLampColor);
				context.dispatch('postLampColor');
			},
		},
	});
}
