import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';

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
		<div>
			<h1>{localization.friendLinks}</h1>

			<ul>
				{generalLinks.map((link) => (
					<li key={link.url}>
						<a href={link.url}>{link.title}</a>
					</li>
				))}
			</ul>

			<h2>{localization.tvGamesHeader}</h2>
			<ul>
				{tvGameLinks.map((link) => (
					<li key={link.url}>
						<a href={link.url}>{link.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FriendLinks;