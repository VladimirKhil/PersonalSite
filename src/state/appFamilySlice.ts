import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppFamilyInfo } from "appregistry-client/dist/responses/AppFamilyInfo";
import { RootState } from "./store";
import { AppInfo } from "appregistry-client/dist/responses/AppInfo";
import { AppInstallerReleaseInfoResponse } from "appregistry-client/dist/responses/AppInstallerReleaseInfoResponse";
import { AppReleaseInfo } from "appregistry-client/dist/responses/AppReleaseInfo";
import DataContext from "../model/DataContext";

interface AppFamilyState {
	appFamilies: AppFamilyInfo[];
	apps: AppInfo[];
	appFamilyId: string;
	appId: string;
	screenshots: string[];
	installers: AppInstallerReleaseInfoResponse[];
	releases: AppReleaseInfo[];
	releasePage: number;
	totalReleases: number;
}

const initialState: AppFamilyState = {
	appFamilies: [],
	apps: [],
	appFamilyId: '',
	appId: '',
	screenshots: [],
	installers: [],
	releases: [],
	releasePage: 0,
	totalReleases: 0,
};

export const loadAppFamily = createAsyncThunk(
	'appFamily/loadAppFamily',
	async (arg: any, thunkAPI) => {
		const { appFamilies } = (thunkAPI.getState() as RootState).appFamily;
		const dataContext = thunkAPI.extra as DataContext;
		const appRegistryClient = dataContext.appRegistryClient!;

		if (appFamilies.length === 0) {
			const appFamiliesInfo = await appRegistryClient.getFamiliesAsync();
			thunkAPI.dispatch(appFamilySlice.actions.setAppFamilies(appFamiliesInfo));
		}

		thunkAPI.dispatch(appFamilySlice.actions.setAppFamilyId(arg));

		const apps = await appRegistryClient.getFamilyAppsAsync(arg);
		thunkAPI.dispatch(appFamilySlice.actions.setApps(apps));

		if (apps.length > 0) {
			thunkAPI.dispatch(loadApp(apps[0].id));
		}
	},
);

const PAGE_SIZE = 40;

export const loadApp = createAsyncThunk(
	'appFamily/loadApp',
	async (arg: any, thunkAPI) => {
		thunkAPI.dispatch(appFamilySlice.actions.setAppId(arg));
		const dataContext = thunkAPI.extra as DataContext;
		const appRegistryClient = dataContext.appRegistryClient!;

		const screenshots = await appRegistryClient.getAppScreenshotsAsync(arg);
		thunkAPI.dispatch(appFamilySlice.actions.setScreenshots(screenshots.screenshotUris));

		const installers = await appRegistryClient.getAppInstallersAsync(arg);
		thunkAPI.dispatch(appFamilySlice.actions.setInstallers(installers));

		const releases = await appRegistryClient.getAppReleasesPageAsync(arg, 0, PAGE_SIZE);
		thunkAPI.dispatch(appFamilySlice.actions.setReleases(releases.results));
		thunkAPI.dispatch(appFamilySlice.actions.setReleasePage(0));
		thunkAPI.dispatch(appFamilySlice.actions.setTotalReleases(releases.total));
	},
);

export const loadReleasesPage = createAsyncThunk(
	'appFamily/loadReleasesPage',
	async (arg: { appId: string, page: number }, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const appRegistryClient = dataContext.appRegistryClient!;

		const releases = await appRegistryClient.getAppReleasesPageAsync(arg.appId, arg.page * PAGE_SIZE, PAGE_SIZE);
		thunkAPI.dispatch(appFamilySlice.actions.setReleases(releases.results));
		thunkAPI.dispatch(appFamilySlice.actions.setReleasePage(arg.page));
		thunkAPI.dispatch(appFamilySlice.actions.setTotalReleases(releases.total));
	},
);

export const appFamilySlice = createSlice({
	name: 'appFamily',
	initialState,
	reducers: {
		setAppFamilies: (state: AppFamilyState, action) => {
			state.appFamilies = action.payload;
		},
		setApps: (state: AppFamilyState, action) => {
			state.apps = action.payload;
		},
		setAppFamilyId: (state: AppFamilyState, action) => {
			state.appFamilyId = action.payload;
		},
		setAppId: (state: AppFamilyState, action) => {
			state.appId = action.payload;
		},
		setScreenshots: (state: AppFamilyState, action) => {
			state.screenshots = action.payload;
		},
		setInstallers: (state: AppFamilyState, action) => {
			state.installers = action.payload;
		},
		setReleases: (state: AppFamilyState, action) => {
			state.releases = action.payload;
		},
		setReleasePage: (state: AppFamilyState, action) => {
			state.releasePage = action.payload;
		},
		setTotalReleases: (state: AppFamilyState, action) => {
			state.totalReleases = action.payload;
		},
	}
});

export const {
} = appFamilySlice.actions;


export default appFamilySlice.reducer;