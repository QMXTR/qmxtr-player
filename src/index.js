const {app, BrowserWindow, protocol} = require('electron');
const path = require('path');
const ytProtocol = require('./protocols/youtube');

protocol.registerStandardSchemes(['qmxtr', 'qmxtryt']);

app.on('ready', () => {
	protocol.registerFileProtocol('qmxtr', (req, cb) => {
		const requestPath = req.url
			.replace(/^qmxtr:\/\/qmxtrit\//, '')
			.replace(/\?.*/, '').replace(/\#.*/, '');

		cb(path.resolve(__dirname, '..', requestPath));
	});

	ytProtocol();

	const mainWindow = new BrowserWindow({width: 1280, height: 720});
	mainWindow.loadURL(`qmxtr://qmxtrit/index.html`);
});

app.on('window-all-closed', () => {
	app.quit();
});
