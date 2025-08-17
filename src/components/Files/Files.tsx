import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';

const Files: React.FC = () => {
	useEffect(() => {
		document.title = localization.files;
	}, []);

	const fileLinks = [
		{ title: localization.tvGameMillionOhLucky, url: 'https://vladimirkhil.com/content/redist/tvcomp/OHLUCKY.exe' },
		{ title: localization.tvGameMillionErudit, url: 'https://vladimirkhil.com/content/redist/tvcomp/ERUDIT.exe' },
		{ title: localization.tvGameMillionOhLucky2, url: 'https://vladimirkhil.com/content/redist/tvcomp/OHLUCKY2.exe' },
		{ title: localization.tvGameTheSmartest, url: 'https://vladimirkhil.com/content/redist/tvcomp/thesmartest.zip' },
	];

	return (
		<div>
			<h1>{localization.files}</h1>

			<ul>
				{fileLinks.map((link) => (
					<li key={link.url}>
						<a href={link.url}>{link.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Files;