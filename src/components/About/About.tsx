import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';

import './About.scss';

const About: React.FC = () => {
	useEffect(() => {
		document.title = localization.aboutTheAuthor;
	}, []);

	return (
		<div className='about'>
			<header className='about-header'>
				<h1>{localization.aboutTheAuthor}</h1>
			</header>

			<div className='about-content'>
				<div className='about-photo'>
					<img src='https://vladimirkhil.com/content/images/common/profile.jpg' alt='Vladimir Khil' />
				</div>

				<div className='about-text'>
					<h2>{localization.aboutMyself}</h2>
					<p>
						{localization.aboutMyselfText}
					</p>
					<p>
						{localization.experienceText}
					</p>
					<p>
						{localization.educationText}
					</p>
					<p>
						{localization.projectsText}
					</p>
					<p>
						{localization.currentPositionText}
					</p>
					<div className='about-links'>
						<a href='https://github.com/VladimirKhil' target='_blank' rel='noopener noreferrer' className='github-link'>
							{localization.githubProfile}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
