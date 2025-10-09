import settingsReducer, { languageChanged, SettingsState } from '../../src/state/settingsSlice';

describe('settingsSlice', () => {
	const initialState: SettingsState = {
		culture: null,
	};

	test('should return the initial state', () => {
		expect(settingsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should handle languageChanged with a valid culture', () => {
		const culture = 'en-US';
		const action = languageChanged(culture);
		const newState = settingsReducer(initialState, action);

		expect(newState.culture).toBe(culture);
	});

	test('should handle languageChanged with null culture', () => {
		const previousState: SettingsState = {
			culture: 'en-US',
		};

		const action = languageChanged(null);
		const newState = settingsReducer(previousState, action);

		expect(newState.culture).toBeNull();
	});

	test('should handle languageChanged multiple times', () => {
		let state = settingsReducer(initialState, languageChanged('en-US'));
		expect(state.culture).toBe('en-US');

		state = settingsReducer(state, languageChanged('ru-RU'));
		expect(state.culture).toBe('ru-RU');

		state = settingsReducer(state, languageChanged('sr-RS'));
		expect(state.culture).toBe('sr-RS');
	});

	test('should not mutate the original state', () => {
		const originalState: SettingsState = {
			culture: 'en-US',
		};

		const action = languageChanged('ru-RU');
		const newState = settingsReducer(originalState, action);

		expect(originalState.culture).toBe('en-US'); // Original state unchanged
		expect(newState.culture).toBe('ru-RU'); // New state has new value
		expect(newState).not.toBe(originalState); // Different objects
	});
});