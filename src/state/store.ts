import { configureStore } from '@reduxjs/toolkit';
import spardReducer from './spardSlice';
import spardTableReducer from './spardTableSlice';

const store = configureStore({
	reducer: {
		spard: spardReducer,
		spardTable: spardTableReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
