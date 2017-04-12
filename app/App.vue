<template>
	<div id="app">
		<q-workspace>
			<q-panel>
				<q-tab>
					<q-tab-panel key="aa" title="Album Arts" default @active="drawWave">
						<q-aa-panel></q-aa-panel>
					</q-tab-panel>
					<q-tab-panel key="mp1" title="My Panel" @active="drawWave">
						<h1>Hello, World!</h1>
					</q-tab-panel>
					<q-tab-panel key="mp2" title="My Panel2" @active="drawWave">
						<h1>Lorem, ipsum!</h1>
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
</style>

<script>
	export default {
		methods: {
			drawWave(){
				this.$store.dispatch('draw-wave');
			}
		}
	};
</script>
