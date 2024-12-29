import Config from './model/Config';
import { getCulture } from './model/resources/localization';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import store from './state/store';
import { load } from './state/spardSlice';
import { Provider } from 'react-redux';
import SpardView from './components/SpardView/SpardView';

declare const config: Config;

function run() {
	const host = document.getElementById('reactHost');

	if (!host) {
		console.error('reactHost element not found!');
		return;
	}

	const culture = getCulture();

	if (culture.length > 0) {
		config.spardClient.culture = culture;
	}

	const root = createRoot(host);
	root.render(<Provider store={store}><SpardView /></Provider>);

	store.dispatch(load());
}

run();