import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../src/components/App/App';

// Mock the localization module
jest.mock('../../../src/model/resources/localization', () => ({
	home: 'Home'
}));

// Mock the LanguageView component
jest.mock('../../../src/components/LanguageView/LanguageView', () => {
	return function MockLanguageView() {
		return <div data-testid="language-view">Language View</div>;
	};
});

describe('App Component', () => {
	test('renders without crashing', () => {
		render(
			<App>
				<div>Test Content</div>
			</App>
		);
	});

	test('renders header with home link', () => {
		render(
			<App>
				<div>Test Content</div>
			</App>
		);

		const homeLink = screen.getByRole('link', { name: 'Home' });
		expect(homeLink).toBeInTheDocument();
		expect(homeLink).toHaveAttribute('href', 'https://vladimirkhil.com');
	});

	test('renders children content', () => {
		const testContent = 'Test Children Content';
		render(
			<App>
				<div>{testContent}</div>
			</App>
		);

		expect(screen.getByText(testContent)).toBeInTheDocument();
	});

	test('renders language view component', () => {
		render(
			<App>
				<div>Test Content</div>
			</App>
		);

		expect(screen.getByTestId('language-view')).toBeInTheDocument();
	});

	test('has proper semantic structure', () => {
		render(
			<App>
				<div>Test Content</div>
			</App>
		);

		expect(screen.getByRole('banner')).toBeInTheDocument(); // header
		expect(screen.getByRole('main')).toBeInTheDocument(); // main
	});
});