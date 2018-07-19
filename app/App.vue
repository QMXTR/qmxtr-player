<template>
	<q-main id="app">
		<q-panel>
			<q-workspace>
				<q-panel>
					<q-tab>
						<q-tab-panel title="Info" default>
							<q-aa-panel></q-aa-panel>
						</q-tab-panel>

						<q-tab-panel title="Visual">
							<q-video-panel></q-video-panel>
						</q-tab-panel>

						<q-tab-panel title="Volume">
							<q-volume-panel></q-volume-panel>
						</q-tab-panel>

						<q-tab-panel title="Equalizer">
							<q-equalizer-panel></q-equalizer-panel>
						</q-tab-panel>

						<q-tab-panel title="Library">
							<q-library></q-library>
						</q-tab-panel>

						<q-tab-panel title="Search">
							<q-query></q-query>
						</q-tab-panel>
					</q-tab>
				</q-panel>
			</q-workspace>
			<q-aside>
				<q-panel>
					<q-playlist></q-playlist>
				</q-panel>
			</q-aside>
		</q-panel>
		<q-controlbar>
			<q-panel>
				<q-controller></q-controller>
				<q-seekbar></q-seekbar>
				<q-volume></q-volume>
			</q-panel>
		</q-controlbar>
	</q-main>
</template>

<style lang="less">
	body, html {
		margin: 0;
		padding: 0;
	}

	::selection {
		background: #1de9b6;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}

	::-webkit-scrollbar-thumb {
		background: #1de9b6;
		border: none;
		border-radius: 0px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: lighten(#1de9b6, 10%);
	}

	::-webkit-scrollbar-thumb:active {
		background: lighten(#1de9b6, 5%);
	}

	::-webkit-scrollbar-track {
		background: #404040;
		border: none;
		border-radius: 0px;
	}

	::-webkit-scrollbar-track:active {
		background: darken(#404040, 10%);
	}

	::-webkit-scrollbar-corner {
		background: #404040;
	}

	* {
		scrollbar-arrow-color: #1de9b6;
		scrollbar-base-color: #404040;
		scrollbar-track-color: #404040;
		scrollbar-face-color: #1de9b6;
		scrollbar-highlight-color: #404040;
		scrollbar-3dlight-color: #404040;
		scrollbar-darkshadow-color: #404040;
		scrollbar-shadow-color: #1de9b6;
	}
</style>

<script>
	export default {
		data() {
			return {
				val: 'Stereo Mix'
			};
		},

		computed: {
			queue() {
				if(!window.qmxtr) return null;
				if(!window.qmxtr.player) return null;
				return window.qmxtr.player.queuePlaylist;
			}
		}
	};
</script>
