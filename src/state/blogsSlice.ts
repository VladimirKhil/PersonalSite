import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DataContext from '../model/DataContext';
import BlogEntriesPage from 'mybackend-client/dist/models/BlogEntriesPage';
import Tag from 'mybackend-client/dist/models/Tag';
import { RootState } from './store';
import BlogEntry from 'mybackend-client/dist/models/BlogEntry';

interface BlogsState {
	tags: Tag[];
	tagId?: number;
	entriesPage: BlogEntriesPage;
	entryId?: number;
	entry?: BlogEntry;
}

const initialState: BlogsState = {
	tags: [],
	entriesPage: {
		entries: [],
		totalCount: 0,
	},
};

export const loadTags = createAsyncThunk(
	'blogs/loadTags',
	async (arg: void, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const state = thunkAPI.getState() as RootState;

		if (state.blogs.tags.length > 0) {
			return state.blogs.tags;
		}

		const myBackendClient = dataContext.myBackendClient!;

		const tags = await myBackendClient.getTagsAsync();
		return tags;
	},
);

export const loadEntriesPage = createAsyncThunk(
	'news/loadEntriesPage',
	async (arg: number, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const myBackendClient = dataContext.myBackendClient!;

		const entriesPage = await myBackendClient.getBlogEntriesAsync(arg, 0, 100);
		entriesPage.entries = entriesPage.entries.sort((a: BlogEntry, b: BlogEntry) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
		return entriesPage;
	},
);

export const loadEntry = createAsyncThunk(
	'news/loadEntry',
	async (arg: number, thunkAPI) => {
		const dataContext = thunkAPI.extra as DataContext;
		const state = thunkAPI.getState() as RootState;

		if (state.blogs.entriesPage.entries.length > 0) {
			const entry = state.blogs.entriesPage.entries.find(entry => entry.id === arg);
			if (entry) {
				return entry;
			}
		}

		const myBackendClient = dataContext.myBackendClient!;

		const entry = await myBackendClient.getBlogEntryAsync(arg);
		return entry;
	},
);

export const blogsSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: { },
	extraReducers: (builder) => {
		builder.addCase(loadTags.fulfilled, (state, action) => {
			state.tags = action.payload;
		});

		builder.addCase(loadEntriesPage.pending, (state, action) => {
			state.tagId = action.meta.arg;
		});

		builder.addCase(loadEntriesPage.fulfilled, (state, action) => {
			state.entriesPage = action.payload;
		});

		builder.addCase(loadEntry.pending, (state, action) => {
			state.entryId = action.meta.arg;
		});

		builder.addCase(loadEntry.fulfilled, (state, action) => {
			state.entry = action.payload;
		});
	}
});

export const {
} = blogsSlice.actions;

export default blogsSlice.reducer;
