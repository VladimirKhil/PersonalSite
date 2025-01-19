import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import appFamilyReducer from './appFamilySlice';
import spardReducer from './spardSlice';
import spardTableReducer from './spardTableSlice';
import DataContext from '../model/DataContext';

export const dataContext: DataContext = {
	appRegistryClient: null,
	spardClient: null,
};

const store = configureStore({
	reducer: {
		settings: settingsReducer,
		appFamily: appFamilyReducer,
		spard: spardReducer,
		spardTable: spardTableReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		thunk: {
			extraArgument: dataContext,
		}
	}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
