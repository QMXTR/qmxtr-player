<template>
	<div id="app">
		<q-workspace>
			<q-panel>
				<q-tab>
					<q-tab-panel key="aa" title="Album Arts" default @active="updatePanel">
						<q-aa-panel></q-aa-panel>
					</q-tab-panel>

					<q-tab-panel key="vol" title="Volume" @active="updatePanel">
						<q-volume-panel ref="vol"></q-volume-panel>
					</q-tab-panel>

					<q-tab-panel key="eq" title="Equalizer" @active="updatePanel">
						<q-equalizer-panel ref="eq"></q-equalizer-panel>
					</q-tab-panel>
				</q-tab>
			</q-panel>
		</q-workspace>
		<q-aside>
			<q-panel>
				<q-playlist></q-playlist>
			</q-panel>
		</q-aside>
		<q-controlbar>
			<q-panel>
				<q-controller></q-controller>
				<q-seekbar></q-seekbar>
				<q-volume></q-volume>
			</q-panel>
		</q-controlbar>
	</div>
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
		methods: {
			updatePanel(){
				this.drawWave();
				this.$refs.vol.update();
				this.$refs.eq.update();
			},

			drawWave(){
				this.$store.dispatch('draw-wave');
			}
		}
	};
</script>
