import React from 'react';
import localization from '../../model/resources/localization';

import './Donate.scss';

const Donate: React.FC = () => {
	const donationLinks = [
		{
			name: 'Patreon',
			url: 'https://patreon.com/vladimirkhil',
			description: localization.donatePatreonDescription,
			className: 'patreon'
		},
		{
			name: 'Boosty',
			url: 'https://boosty.to/vladimirkhil',
			description: localization.donateBoostyDescription,
			className: 'boosty'
		},
		{
			name: 'YooMoney',
			url: 'https://yoomoney.ru/to/410012283941753',
			description: localization.donateYooMoneyDescription,
			className: 'yoomoney'
		}
	];

	return (
		<div className="donate">
			<div className="donate-header">
				<h1>{localization.donateTitle}</h1>
				<p className="donate-explanation">
					{localization.donateExplanation}
				</p>
			</div>

			<div className="donation-links">
				{donationLinks.map((link, index) => (
					<div key={index} className={`donation-card ${link.className}`}>
						<h3>{link.name}</h3>
						<p>{link.description}</p>
						<a 
							href={link.url} 
							target="_blank" 
							rel="noopener noreferrer"
							className="donate-button"
						>
							{localization.donateSupport} {link.name}
						</a>
					</div>
				))}
			</div>

			<div className="donate-footer">
				<p>{localization.donateThankYou}</p>
			</div>
		</div>
	);
};

export default Donate;
