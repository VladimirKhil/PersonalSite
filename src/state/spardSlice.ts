import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ProcessResult from 'spard-client/dist/models/ProcessResult';
import SpardExampleBaseInfo from 'spard-client/dist/models/SpardExampleBaseInfo';
import spardClient from '../utils/spard';
import { AppDispatch, RootState } from './store';
import getErrorMessage from '../utils/getErrorMessage';

interface SpardState {
	inProgress: boolean;
	examples: SpardExampleBaseInfo[];
	selectedExampleId: number;
	input: string;
	transform: string;
	result: ProcessResult<string>;
}

const initialState: SpardState = {
	inProgress: false,
	examples: [],
	selectedExampleId: -1,
	input: '',
	transform: '',
	result: { result: '', duration: '' }
};

export const spardSlice = createSlice({
	name: 'spard',
	initialState,
	reducers: {
		setInProgress: (state: SpardState, action: PayloadAction<boolean>) => {
			state.inProgress = action.payload;
		},
		setExamples: (state: SpardState, action: PayloadAction<SpardExampleBaseInfo[]>) => {
			state.examples = action.payload;
		},
		setSelectedExampleId: (state: SpardState, action: PayloadAction<number>) => {
			state.selectedExampleId = action.payload;
		},
		onInputChanged: (state: SpardState, action: PayloadAction<string>) => {
			state.input = action.payload;
		},
		onTransformChanged: (state: SpardState, action: PayloadAction<string>) => {
			state.transform = action.payload;
		},
		setResult: (state: SpardState, action: PayloadAction<ProcessResult<string>>) => {
			state.result = action.payload;
		}
	}
});

export const {
	setInProgress,
	setExamples,
	setSelectedExampleId,
	onInputChanged,
	onTransformChanged,
	setResult
} = spardSlice.actions;

export const load = () => async (dispatch: AppDispatch): Promise<void> => {
	dispatch(setInProgress(true));
	try {
		const examples = await spardClient.getExamplesAsync();
		dispatch(setExamples(examples));
	}
	catch (e) {
		dispatch(setResult({ result: getErrorMessage(e), duration: '' }));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export const selectExample = (exampleId: number) => async (dispatch: AppDispatch): Promise<void> => {
	dispatch(setSelectedExampleId(exampleId));
	dispatch(setInProgress(true));
	try {
		const example = await spardClient.getExampleAsync(exampleId);
		dispatch(onInputChanged(example.input));
		dispatch(onTransformChanged(example.transform));
	}
	catch (e) {
		dispatch(setResult({ result: getErrorMessage(e), duration: '' }));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export const runTransform = () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
	const state = getState().spard;

	dispatch(setInProgress(true));
	try {
		const result = await spardClient.transformAsync({
			input: state.input,
			transform: state.transform
		});

		dispatch(setResult(result));
	}
	catch (e) {
		dispatch(setResult({ result: getErrorMessage(e), duration: '' }));
	}
	finally {
		dispatch(setInProgress(false));
	}
}

export default spardSlice.reducer;
