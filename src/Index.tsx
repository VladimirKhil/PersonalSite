import Config from './model/Config';
import localization from './model/resources/localization';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import store, { dataContext } from './state/store';
import { loadSpardExamples } from './state/spardSlice';
import { Provider } from 'react-redux';
import SpardView from './components/SpardView/SpardView';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import SpardTableView from './components/SpardTableView/SpardTableView';
import AppFamilyView from './components/AppFamilyView/AppFamilyView';
import App from './components/App/App';
import { loadAppFamily } from './state/appFamilySlice';
import { languageChanged } from './state/settingsSlice';
import AppRegistryClient from 'appregistry-client';
import SpardClient from 'spard-client';

declare const config: Config;

const STATE_KEY = 'Settings_State';

function run() {
	const host = document.getElementById('reactHost');

	if (!host) {
		console.error('reactHost element not found!');
		return;
	}

	const savedState = localStorage.getItem(STATE_KEY);

	if (savedState) {
		const settings = JSON.parse(savedState);
		store.dispatch(languageChanged(settings.culture));
	}

	let currentSettings = store.getState().settings;

	if (currentSettings.culture) {
		localization.setLanguage(currentSettings.culture);
		config.spardClient.culture = currentSettings.culture;
		config.appRegistry.culture = currentSettings.culture == 'ru' ? 'ru-RU' : 'en-US';
	}

	dataContext.appRegistryClient = new AppRegistryClient(config.appRegistry);
	dataContext.spardClient = new SpardClient(config.spardClient);

	store.subscribe(() => {
		const newState = store.getState();
		const newSettings = newState.settings;

		if (newSettings !== currentSettings) {
			localStorage.setItem(STATE_KEY, JSON.stringify(newSettings));

			if (newSettings.culture !== currentSettings.culture) {
				window.location.reload();
			}

			currentSettings = newSettings;
		}
	});

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<div>Hello, world!</div>} />

				<Route path='si'>
					<Route path='game' element={<AppFamilyView />} loader={async () => store.dispatch(loadAppFamily('16d03adf-18f1-4aa5-a6cd-3b25b5f86d4c'))} />
					<Route path='siquester' element={<AppFamilyView />} loader={async () => store.dispatch(loadAppFamily('b89345d8-527a-4c2e-abd1-09c5b856aeaa'))} />
					<Route path='simulator' element={<AppFamilyView />} loader={async () => store.dispatch(loadAppFamily('4d822142-6533-4f09-8131-5daf29d1d10d'))} />
				</Route>

				<Route path='circe' element={<AppFamilyView />} loader={async () => store.dispatch(loadAppFamily('acabc1c3-cbd3-4103-bbeb-799f7e1d88d5'))} />

				<Route path="lingware">
					<Route path="spard">
						<Route path="implementation" element={<SpardView />} loader={async () => store.dispatch(loadSpardExamples())} />
						<Route path="table" element={<SpardTableView />} />
					</Route>
				</Route>
			</>
	));

	const root = createRoot(host);

	root.render(
		<Provider store={store}>
			<App>
				<RouterProvider router={router} />
			</App>
		</Provider>
	);
}

run();