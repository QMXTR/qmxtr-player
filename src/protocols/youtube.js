const axios = require('axios');
const {protocol} = require('electron');
const {URL} = require('url');
const ytdl = require('ytdl-core');

const API_KEY = require('../../config.json').API_KEY;

const downloadMusic = (v) => {
	const url = `https://youtube.com/watch?v=${v}`;

	const stream = ytdl(url, {
		filter: 'audioonly'
	});

	return stream;
};

module.exports = function register() {
	protocol.registerStreamProtocol('qmxtryt', (request, callback) => {
		const url = new URL(request.url);
		switch(url.hostname) {
			case 'search':
				axios({
					method: 'get',
					url: 'https://www.googleapis.com/youtube/v3/search',
					params: {
						part: 'snippet',
						type: 'video',
						maxResults: url.searchParams.get('limit'),
						q: url.searchParams.get('query'),
						key: API_KEY
					},
					responseType: 'stream'
				}).then(stream => {
					callback({
						statusCode: 200,
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json'
						},
						data: stream.data
					});
				});

				break;

			case 'music':
				callback({
					statusCode: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': "audio/mpeg"
					},
					data: downloadMusic(url.searchParams.get('id'))
				});

				break;

			default:
				callback({
					statusCode: 404
				});
		}
	});
};
