import getErrorMessage from '../../src/utils/getErrorMessage';

describe('getErrorMessage', () => {
	test('should return error message for Error instance', () => {
		const error = new Error('Test error message');
		const result = getErrorMessage(error);

		expect(result).toBe('Test error message');
	});

	test('should return string representation for non-Error objects', () => {
		const mockObject = {
			toString: () => 'Custom error representation'
		};
		const result = getErrorMessage(mockObject);

		expect(result).toBe('Custom error representation');
	});

	test('should handle string values', () => {
		const result = getErrorMessage('Simple string error');

		expect(result).toBe('Simple string error');
	});
});