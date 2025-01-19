import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
	culture: string | null;
}

const initialState: SettingsState = {
	culture: null,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		languageChanged: (state: SettingsState, action: PayloadAction<string | null>) => {
			state.culture = action.payload;
		},
	}
});

export const {
	languageChanged,
} = settingsSlice.actions;

export default settingsSlice.reducer;