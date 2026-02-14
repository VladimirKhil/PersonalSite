import React from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar: React.FC = () => {
	const news = useAppSelector(state => state.news);

	const latestNews = news.news.slice(0, 5);

	return (
		<aside className='sidebar'>
			<div className='sidebar-profile'>
				<div className='sidebar-photo'>
					<img src='https://vladimirkhil.com/content/images/common/profile.jpg' alt='Vladimir Khil' />
				</div>

				<h3 className='sidebar-name'>{localization.aboutMyself}</h3>
				<p className='sidebar-bio'>{localization.profileBio}</p>

				<div className='sidebar-social'>
					<a href='https://vk.com/vladimirkhil' target='_blank' rel='noopener noreferrer' title='VK' className='social-link social-vk'>
						<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.45-1.71-1.45-0.87-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.48v1.32c0 .34-.11.55-1.01.55-1.49 0-3.14-.9-4.3-2.58C5.89 10.93 5.5 9.35 5.5 8.97c0-.21.08-.4.48-.4h1.46c.36 0 .49.16.63.54.69 2.01 1.84 3.77 2.32 3.77.18 0 .26-.08.26-.53V10.5c-.05-.95-.56-1.03-.56-1.37 0-.16.14-.33.36-.33h2.3c.3 0 .41.16.41.51v2.5c0 .3.13.41.22.41.18 0 .33-.11.66-.44 1.02-1.14 1.74-2.89 1.74-2.89.1-.21.26-.4.62-.4h1.46c.44 0 .54.23.44.51-.18.87-1.97 3.38-1.97 3.38-.16.25-.22.37 0 .65.16.21.67.65 1.02 1.04.64.72 1.13 1.33 1.26 1.75.14.41-.07.63-.48.63z"/></svg>
					</a>
					<a href='https://patreon.com/vladimirkhil' target='_blank' rel='noopener noreferrer' title='Patreon' className='social-link social-patreon'>
						<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/></svg>
					</a>
					<a href='https://boosty.to/vladimirkhil' target='_blank' rel='noopener noreferrer' title='Boosty' className='social-link social-boosty'>
						<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.49 2L4.25 12.26h4.5L6.49 22l11.02-12.74h-5.02L16.49 2H7.49z"/></svg>
					</a>
					<a href='https://github.com/VladimirKhil' target='_blank' rel='noopener noreferrer' title='GitHub' className='social-link social-github'>
						<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
					</a>
				</div>
			</div>

			<div className='sidebar-section'>
				<h3 className='sidebar-section-title'>{localization.latestNews}</h3>

				{latestNews.length > 0 ? (
					<ul className='sidebar-news-list'>
						{latestNews.map((item, index) => (
							<li key={index} className='sidebar-news-item'>
								<span className='sidebar-news-date'>{new Date(item.dateTime).toLocaleDateString()}</span>
								<span className='sidebar-news-text' dangerouslySetInnerHTML={{ __html: item.text }} />
							</li>
						))}
					</ul>
				) : (
					<div className='sidebar-news-list'>
						<Link to='/news'>{localization.websiteNews}</Link>
					</div>
				)}
			</div>

			<div className='sidebar-section'>
				<ul className='sidebar-links'>
					<li><Link to='/friend'>{localization.friendLinks}</Link></li>
					<li><Link to='/donate'>{localization.supportFinancially}</Link></li>
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
