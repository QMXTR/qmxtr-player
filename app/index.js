import Vue from "vue";
import Vuex from "vuex";
import Qmxtr from "qmxtr";
import EqualizerPlugin from "qmxtr-equalizer";
import KeyInputPlugin from "qmxtr-keyinput";
import VolumePlugin from "qmxtr-volume";

import App from "./App.vue";

const qmxtr = {};
console.log(Qmxtr);

qmxtr.equalizer = new EqualizerPlugin({
	60: 1,
	170: 1,
	310: 1,
	600: 1,
	1000: 1,
	3000: 1,
	6000: 1,
	12000: 1,
	14000: 1,
	16000: 1
});

qmxtr.volume = new VolumePlugin(1, 1);
qmxtr.keyInput = new KeyInputPlugin({});

qmxtr.vis = document.createElement('div');
qmxtr.player = new Qmxtr.QPlayer({
	visualizer: qmxtr.vis,
	plugins: [
		qmxtr.volume,
		qmxtr.equalizer,
		qmxtr.keyInput
	]
});

Vue.use(Vuex);
Vue.use(Qmxtr.QmxtrUI);

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

qmxtr.player.addToQueue({
	src: '/test/audio/000.mp3',
	title: 'Heikousen',
	author: 'Sayuri'
});

qmxtr.player.addToQueue({
	src: '/test/audio/001.mp3',
	title: 'Shelter',
	author: 'Porter Robinson',
	albumArt: 'http://img1.ak.crunchyroll.com/i/spire2/26c31ebcac89f27556d7f16298b86dbd1476500039_full.jpg'
});

qmxtr.player.addToQueue({
	src: '/test/audio/002.mp3',
	title: 'Marble Soda',
	author: 'Shawn Wasabi'
});

window.qmxtr = qmxtr;
