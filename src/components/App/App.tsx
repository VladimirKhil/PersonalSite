import React from 'react';

import './App.scss';
import localization from '../../model/resources/localization';
import LanguageView from '../LanguageView/LanguageView';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	return (
		<div className='app'>
			<header>
				<a href='https://vladimirkhil.com'>{localization.home}</a>
				<LanguageView />
			</header>

			<main>
				{children}
			</main>
		</div>
	);
};

export default App;