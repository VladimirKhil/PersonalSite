import React, { useState } from 'react';
import localization from '../../model/resources/localization';
import LanguageView from '../LanguageView/LanguageView';

import './App.scss';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className='app'>
			<header className='app-header'>
				<div className='app-header-left'>
					<a href='/' className='app-logo'>{localization.home}</a>

					<button
						className='app-menu-toggle'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Toggle menu'
					>
						☰
					</button>
				</div>

				<nav className={`app-nav ${menuOpen ? 'app-nav--open' : ''}`}>
					<a href='/blog'>{localization.blog}</a>
					<a href='/about'>{localization.aboutTheAuthor}</a>
					<a href='/apps'>{localization.products}</a>
					<a href='/news'>{localization.news}</a>
					<a href='/files'>{localization.files}</a>
				</nav>

				<div className='app-header-right'>
					<a href='/si/game' className='app-sigame-btn'>SIGame</a>
					<LanguageView />
				</div>
			</header>

			<main className='app-main'>
				{children}
			</main>
		</div>
	);
};

export default App;