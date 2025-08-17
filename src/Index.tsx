import Config from './model/Config';
import localization from './model/resources/localization';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import store, { dataContext } from './state/store';
import { loadSpardExamples } from './state/spardSlice';
import { Provider } from 'react-redux';
import SpardView from './components/SpardView/SpardView';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import SpardTableView from './components/SpardTableView/SpardTableView';
import AppFamilyView from './components/AppFamilyView/AppFamilyView';
import App from './components/App/App';
import { loadAppFamily } from './state/appFamilySlice';
import { languageChanged } from './state/settingsSlice';
import AppRegistryClient from 'appregistry-client';
import SpardClient from 'spard-client';
import MyBackendClient from 'mybackend-client';
import News from './components/News/News';
import { loadNews, loadYears } from './state/newsSlice';
import NewsYears from './components/NewsYears/NewsYears';
import NavigationWatcher from './components/NavigationWatcher/NavigationWatcher';
import BlogEntriesView from './components/BlogEntriesView/BlogEntriesView';
import { loadEntriesPage, loadEntry, loadTags } from './state/blogsSlice';
import BlogEntryView from './components/BlogEntryView/BlogEntryView';
import FriendLinks from './components/FriendLinks/FriendLinks';
import Files from './components/Files/Files';
import About from './components/About/About';
import Donate from './components/Donate/Donate';

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
		config.spardClient.culture = currentSettings.culture == 'ru' ? 'ru-RU' : 'en-US';
		config.appRegistry.culture = currentSettings.culture == 'ru' ? 'ru-RU' : 'en-US';

		if (config.myBackend) {
			config.myBackend.culture = currentSettings.culture == 'ru' ? 'ru-RU' : 'en-US';
		}
	}

	dataContext.appRegistryClient = new AppRegistryClient(config.appRegistry);

	if (config.myBackend) {
		dataContext.myBackendClient = new MyBackendClient(config.myBackend);
	}

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

	const basePath = window.location.pathname.startsWith('/v2') ? '/v2' : '/';

	const Layout = () => (
		<>
			<NavigationWatcher />
			<Outlet />
		</>
	);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path='' element={<Layout />}>
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

					<Route path="news">
						<Route path="" element={<NewsYears />} loader={async () => store.dispatch(loadYears()) } />

						<Route path=":year" element={<News />} loader={ async ({ params }) => {
							const year = params.year ? parseInt(params.year, 10) : 0;
							return store.dispatch(loadNews(year));
						}} />
					</Route>

					<Route path='blog'>
						<Route path='tags'>
							<Route path=':tagId' element={<BlogEntriesView />} loader={async ({ params }) => {
								const tagId = params.tagId ? parseInt(params.tagId, 10) : 0;
								store.dispatch(loadTags());
								return store.dispatch(loadEntriesPage(tagId));
							}} />
						</Route>

						<Route path=':entryId' element={<BlogEntryView />} loader={async ({ params }) => {
							const entryId = params.entryId ? parseInt(params.entryId, 10) : 0;
							store.dispatch(loadEntry(entryId));
						}} />
					</Route>

					<Route path='friend' element={<FriendLinks />} />
					<Route path='files' element={<Files />} />
					<Route path='about' element={<About />} />
					<Route path='donate' element={<Donate />} />
				</Route>
			</>
		), {
			basename: basePath,
		});

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