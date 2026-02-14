import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';

import './FriendLinks.scss';

const FriendLinks: React.FC = () => {
	useEffect(() => {
		document.title = localization.friendLinks;
	}, []);

	const generalLinks = [
		{ title: localization.friendLinkSI, url: 'http://svoya-igra.org' },
		{ title: localization.friendLinkGameShows, url: 'http://gameshows.ru' },
		{ title: localization.friendLinkAlexUtah, url: 'http://si.alex-utah.org' },
		{ title: localization.friendLinkAlexandrProsvirnov, url: 'http://alprosv.narod.ru/iq/intell.htm' },
	];

	const tvGameLinks = [
		{ title: localization.tvGameSvoyaIgra, url: 'http://jeogame.narod.ru/' },
		{ title: localization.tvGameChgkDf, url: 'http://df.chgk.info/whatsnew.html' },
		{ title: localization.tvGameMillionTvgame, url: 'http://tvgame.narod.ru/p28.htm' },
		{ title: localization.tvGameSlaboeZvenoApteka, url: 'http://apteka2005.narod.ru/programs.files/slaboe_zveno.htm' },
		{ title: localization.tvGameRussianRoulette, url: 'http://rusrul.ru/' },
		{ title: localization.tvGamePoleChudesOnline, url: 'http://www.polechudes.tv/' },
		{ title: localization.tvGameUgadajMelodiju, url: 'http://kazus.ru/programs/download/13876/' },
	];

	return (
		<div className='friend-links-view'>
			<h1>{localization.friendLinks}</h1>

			<div className='friend-links-grid'>
				{generalLinks.map((link) => (
					<a key={link.url} href={link.url} className='friend-link-card' target='_blank' rel='noopener noreferrer'>
						<div className='friend-link-badge'>🔗</div>
						<div className='friend-link-title'>{link.title}</div>
					</a>
				))}
			</div>

			<h2>{localization.tvGamesHeader}</h2>

			<div className='friend-links-grid'>
				{tvGameLinks.map((link) => (
					<a key={link.url} href={link.url} className='friend-link-card' target='_blank' rel='noopener noreferrer'>
						<div className='friend-link-badge'>🎮</div>
						<div className='friend-link-title'>{link.title}</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default FriendLinks;