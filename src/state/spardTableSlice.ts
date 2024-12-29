import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localization from '../model/resources/localization';
import spardClient from '../utils/spard';
import { AppDispatch, RootState } from './store';
import getErrorMessage from '../utils/getErrorMessage';

interface SpardTableState {
	inProgress: boolean;
	input: string;
	transform: string;
	result: string;
	outputInfo: string;
}

const initialState: SpardTableState = {
	inProgress: false,
	input: 'abcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbababcbcbaabcbcbcbccbababcbcbcbabbaccbababbccbabbcacbbaaabcbaaaccbcbabbbbcaabbbcbbabbaccbbababbabbcbabcbcbabcbcbbcbacbcbab',
	transform: `abc => W
baab => P
ab => X
ac => Y
aa => Z
ba => U
cb => Q
a => a
b => b
c => c`,
	result: '',
	outputInfo: ''
};

export const spardTableSlice = createSlice({
	name: 'spardTable',
	initialState,
	reducers: {
		setInProgress: (state: SpardTableState, action: PayloadAction<boolean>) => {
			state.inProgress = action.payload;
		},
		onInputChanged: (state: SpardTableState, action: PayloadAction<string>) => {
			state.input = action.payload;
		},
		onTransformChanged: (state: SpardTableState, action: PayloadAction<string>) => {
			state.transform = action.payload;
		},
		setResult: (state: SpardTableState, action: PayloadAction<string>) => {
			state.result = action.payload;
		},
		setOutputInfo: (state: SpardTableState, action: PayloadAction<string>) => {
			state.outputInfo = action.payload;
		}
	}
});

export const {
	setInProgress,
	onInputChanged,
	onTransformChanged,
	setResult,
	setOutputInfo
} = spardTableSlice.actions;

export const runTransform = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	const state = getState().spardTable;

	dispatch(setInProgress(true));
	try {
		const result = await spardClient.transformTableAsync({
			input: state.input,
			transform: state.transform
		});

		dispatch(setResult(result.result));
		dispatch(setOutputInfo(`${localization.classicTransform}: ${result.standardTransformDuration};
${localization.tableTransform}: ${result.tableTransformDuration};
(${result.isStandardResultTheSame ? localization.isClassicResultTheSame : localization.isClassicResultNotTheSame})`));
	}
	catch (e) {
		dispatch(setResult(getErrorMessage(e)));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export const generateTable = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	const state = getState().spardTable;

	dispatch(setInProgress(true));
	try {
		const result = await spardClient.generateTableAsync(state.transform);

		dispatch(setResult(result.result));
		dispatch(setOutputInfo(`${localization.transformationTime}: ${result.duration}`));
	}
	catch (e) {
		dispatch(setResult(getErrorMessage(e)));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export const generateSourceCode = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	const state = getState().spardTable;

	dispatch(setInProgress(true));
	try {
		const result = await spardClient.generateSourceCodeAsync(state.transform);

		dispatch(setResult(result.result));
		dispatch(setOutputInfo(`${localization.transformationTime}: ${result.duration}`));
	}
	catch (e) {
		dispatch(setResult(getErrorMessage(e)));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export default spardTableSlice.reducer;
