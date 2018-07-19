import Vue from "vue";
import Vuex from "vuex";
import Qmxtr from "qmxtr";
import EqualizerPlugin from "qmxtr-equalizer";
import KeyInputPlugin from "qmxtr-keyinput";
import VolumePlugin from "qmxtr-volume";
import YoutubeProvider from "./providers/YoutubeProvider";
import {webFrame} from "electron";

import App from "./App.vue";


webFrame.registerURLSchemeAsPrivileged('qmxtr');

const qmxtr = {};
window.qmxtr = qmxtr;

qmxtr.equalizer = new EqualizerPlugin({
	60: 0,
	170: 0,
	310: 0,
	600: 0,
	1000: 0,
	3000: 0,
	6000: 0,
	12000: 0,
	14000: 0,
	16000: 0
});

qmxtr.volume = new VolumePlugin(1, 1);
qmxtr.keyInput = new KeyInputPlugin({});

qmxtr.vis = document.createElement('div');
qmxtr.player = new Qmxtr({
	visualizer: qmxtr.vis,
	plugins: [
		qmxtr.volume,
		qmxtr.equalizer,
		qmxtr.keyInput
	]
});

Vue.use(Vuex);
Vue.use(qmxtr.player);

qmxtr.store = new Vuex.Store({
	state: qmxtr.player.defaultStates,
	mutations: qmxtr.player.defaultMutations,
	actions: qmxtr.player.defaultActions
});

qmxtr.player.attachToVuexStore(qmxtr.store);

qmxtr.app = new Vue({
	el: '#app',
	render(h){
		return h(App);
	},
	store: qmxtr.store
});

window.addEventListener('load', () => {
	const register = () => setTimeout(() => {
		const visualizer = document.querySelector('#visualizer');
		if(!visualizer) return register();
		visualizer.appendChild(qmxtr.vis);
	}, 500);

	register();
}, false);

qmxtr.player.addProvider(new YoutubeProvider(qmxtr.player));
