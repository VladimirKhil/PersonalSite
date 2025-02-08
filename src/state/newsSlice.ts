import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataContext from '../model/DataContext';
import NewsItem from 'mybackend-client/dist/models/NewsItem';

interface NewsState {
	years: number[];
	year: number;
	news: NewsItem[];
}

const initialState: NewsState = {
	years: [],
	year: 0,
	news: [],
};

export const loadYears = createAsyncThunk(
	'news/loadYears',
	async (arg: void, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const myBackendClient = dataContext.myBackendClient!;

		const years = await myBackendClient.getNewsYearAsync();
		return years.sort((a: number, b: number) => a - b);
	},
);

export const loadNews = createAsyncThunk(
	'news/loadNews',
	async (arg: number, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const myBackendClient = dataContext.myBackendClient!;

		const news = await myBackendClient.getNewsByYearAsync(arg);
		return news;
	},
);

export const newSlice = createSlice({
	name: 'spard',
	initialState,
	reducers: { },
	extraReducers: (builder) => {
		builder.addCase(loadYears.fulfilled, (state, action) => {
			state.years = action.payload;
		});

		builder.addCase(loadNews.pending, (state, action) => {
			state.year = action.meta.arg;
		});

		builder.addCase(loadNews.fulfilled, (state, action) => {
			state.news = action.payload;
		});
	}
});

export const {
} = newSlice.actions;

export default newSlice.reducer;
