import Qmxtr from "qmxtr";
import {webFrame} from "electron";

webFrame.registerURLSchemeAsPrivileged('qmxtryt');


class YoutubeProvider extends Qmxtr.MusicProvider {
	constructor(api) {
		super(api);
		this.api = api;
	}

	getName() {
		return "Youtube Provider";
	}

	async query(query, from, limit) {
		const args = {
			limit,
			query
		};

		const url = new URL('qmxtryt://search/search');
		url.search = new URLSearchParams(args);

		const video = await fetch(url).then(v => v.json());

		if(!video.items)
			return {
				total: 0,
				content: []
			};

		return {
			total: video.items.length,
			content: video.items.map(v => new Qmxtr.ProviderItem(this, v.id.videoId, {
				title: v.snippet.title,
				author: '',
				albumArt: `https://i.ytimg.com/vi/${v.id.videoId}/hqdefault.jpg`
			}))
		};
	}

	async load({id, title, author, albumArt}) {
		return new Qmxtr.AudioWrapper(this.api, {
			src: `qmxtryt://music/music?id=${encodeURIComponent(id)}`,
			title,
			albumArt,
			author
		});
	}
}

export default YoutubeProvider;
