import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';

import './Files.scss';

function getFileExtension(url: string): string {
	const parts = url.split('.');
	return parts[parts.length - 1].toUpperCase();
}

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

	const spardLinks = [
		{ title: localization.spardSpecification, url: 'https://vladimirkhil.com/content/docs/spard/SPARD.pdf' },
		{ title: localization.spardIntroduction, url: 'https://vladimirkhil.com/content/docs/spard/SPARD.Introduction.pdf' },
		{ title: localization.spardInterpreter, url: 'https://vladimirkhil.com/content/redist/spard/Spard.zip' },
	];

	const kubok2007Links = [
		{ title: 'Все отчёты по игре', url: 'http://int-igry-online.livejournal.com/tag/%D0%9A%D1%83%D0%B1%D0%BE%D0%BA%20%D0%98%D0%BD%D1%82%D0%B5%D0%BB%D0%BB%D0%B5%D0%BA%D1%82%D0%B0%202007' },
		{ title: 'Официальные правила игры', url: 'http://community.livejournal.com/int_igry_online/6264.html?nc=3' },
		{ title: 'План замка', url: 'https://vladimirkhil.com/content/docs/ki/2007/plan.html' },
		{ title: 'Описание замка', url: 'https://vladimirkhil.com/content/docs/ki/2007/about.html' },
		{ title: 'ДЕНЬ 1: БИТВА ЗА НАСЛЕДСТВО', url: 'https://vladimirkhil.com/content/docs/ki/2007/1.html' },
		{ title: 'ДЕНЬ 2: БИТВА ЗА НАСЛЕДСТВО', url: 'https://vladimirkhil.com/content/docs/ki/2007/2.html' },
		{ title: 'ДЕНЬ 3: БИТВА ЗА НАСЛЕДСТВО', url: 'https://vladimirkhil.com/content/docs/ki/2007/3.html' },
		{ title: 'ДЕНЬ 4: БИТВА ЗА НАСЛЕДСТВО', url: 'https://vladimirkhil.com/content/docs/ki/2007/4.html' },
		{ title: 'ДЕНЬ 5: НЕОПРЕДЕЛЁННОСТЬ', url: 'https://vladimirkhil.com/content/docs/ki/2007/5.html' },
		{ title: 'ПРИЛОЖЕНИЕ К ПРАВИЛАМ', url: 'http://community.livejournal.com/int_igry_online/8290.html' },
		{ title: 'ДЕНЬ 6: НЕОПРЕДЕЛЁННОСТЬ', url: 'https://vladimirkhil.com/content/docs/ki/2007/6.html' },
		{ title: 'ДЕНЬ 7: НЕОПРЕДЕЛЁННОСТЬ', url: 'https://vladimirkhil.com/content/docs/ki/2007/7.html' },
		{ title: 'ДЕНЬ 8: НЕОПРЕДЕЛЁННОСТЬ', url: 'https://vladimirkhil.com/content/docs/ki/2007/8.html' },
		{ title: 'ДЕНЬ 9: НЕОПРЕДЕЛЁННОСТЬ', url: 'https://vladimirkhil.com/content/docs/ki/2007/9.html' },
		{ title: 'ДЕНЬ 10: ВОЛЯ ВАША', url: 'https://vladimirkhil.com/content/docs/ki/2007/10.html' },
		{ title: 'ДЕНЬ 11: ВОЛЯ ВАША', url: 'https://vladimirkhil.com/content/docs/ki/2007/11.html' },
		{ title: 'ДЕНЬ 12: ВОЛЯ ВАША. МЕСТО ДЕЙСТВИЯ: ЛОНДОН', url: 'https://vladimirkhil.com/content/docs/ki/2007/12L.html' },
		{ title: 'ДЕНЬ 12: ВОЛЯ ВАША. МЕСТО ДЕЙСТВИЯ: ЗАМОК', url: 'https://vladimirkhil.com/content/docs/ki/2007/12C.html' },
		{ title: 'ДЕНЬ 13: ВОЛЯ ВАША', url: 'https://vladimirkhil.com/content/docs/ki/2007/13.html' },
		{ title: 'ДЕНЬ 14: ВОЛЯ ВАША', url: 'https://vladimirkhil.com/content/docs/ki/2007/14.html' },
		{ title: 'ДЕНЬ 15: ПРОТИВОСТОЯНИЕ', url: 'https://vladimirkhil.com/content/docs/ki/2007/15.html' },
		{ title: 'ДЕНЬ 16: ПРОТИВОСТОЯНИЕ', url: 'https://vladimirkhil.com/content/docs/ki/2007/16.html' },
		{ title: 'ДЕНЬ 17: ПРОТИВОСТОЯНИЕ', url: 'https://vladimirkhil.com/content/docs/ki/2007/17.html' },
		{ title: 'ДЕНЬ 18: ПРОТИВОСТОЯНИЕ', url: 'https://vladimirkhil.com/content/docs/ki/2007/18.html' },
		{ title: 'ДЕНЬ 19: СУДЬБЫ', url: 'https://vladimirkhil.com/content/docs/ki/2007/19.html' },
		{ title: 'ЗА КАДРОМ', url: 'https://vladimirkhil.com/content/docs/ki/2007/behind.html' },
	];

	const kubok2008Links = [
		{ title: 'Игровая таблица', url: 'https://vladimirkhil.com/content/docs/ki/2008/table.html' },
		{ title: 'Все отчёты по игре', url: 'http://int-igry-online.livejournal.com/tag/%D0%9A%D1%83%D0%B1%D0%BE%D0%BA%20%D0%98%D0%BD%D1%82%D0%B5%D0%BB%D0%BB%D0%B5%D0%BA%D1%82%D0%B0%202008' },
		{ title: 'Правила игры', url: 'https://vladimirkhil.com/content/docs/ki/2008/about.html' },
		{ title: 'Игра 1 от 06.09.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/1.html' },
		{ title: 'Игра 2 от 13.09.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/2.html' },
		{ title: 'Игра 3 от 20.09.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/3.html' },
		{ title: 'Игра 4 от 27.09.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/4.html' },
		{ title: 'Игра 5 от 04.10.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/5.html' },
		{ title: 'Игра 6 от 11.10.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/6.html' },
		{ title: 'Игра 7 от 18.10.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/7.html' },
		{ title: 'Игра 8 от 25.10.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/8.html' },
		{ title: 'Игра 9 от 02.11.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/9.html' },
		{ title: 'Игра 10 от 08.11.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/10.html' },
		{ title: 'Игра 11 от 15.11.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/11.html' },
		{ title: 'Игра 12 от 22.11.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/12.html' },
		{ title: 'Игра 13 от 29.11.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/13.html' },
		{ title: 'Игра 14 от 06.12.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/14.html' },
		{ title: 'Игра 15 от 13.12.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/15.html' },
		{ title: 'Игра 16 от 20.12.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/16.html' },
		{ title: 'Финал года от 27.12.2008', url: 'https://vladimirkhil.com/content/docs/ki/2008/final.html' },
	];

	const isRussian = localization.getLanguage() === 'ru';

	function renderFileCards(links: { title: string; url: string }[]) {
		return (
			<div className='files-grid'>
				{links.map((link) => {
					const ext = getFileExtension(link.url);
					return (
						<a key={link.url} href={link.url} className='file-card'>
							<div className={`file-card-badge file-badge--${ext.toLowerCase()}`}>{ext}</div>
							<div className='file-card-title'>{link.title}</div>
						</a>
					);
				})}
			</div>
		);
	}

	function renderLinkCards(links: { title: string; url: string }[]) {
		return (
			<div className='files-grid'>
				{links.map((link) => (
					<a key={link.url} href={link.url} className='file-card' target='_blank' rel='noopener noreferrer'>
						<div className='file-card-badge file-badge--link'>🔗</div>
						<div className='file-card-title'>{link.title}</div>
					</a>
				))}
			</div>
		);
	}

	return (
		<div className='files-view'>
			<h1>{localization.files}</h1>

			<h2>{localization.games}</h2>
			{renderFileCards(fileLinks)}

			<h2>SPARD</h2>
			{renderFileCards(spardLinks)}

			{isRussian && (
				<>
					<h2>Кубок Интеллекта 2007</h2>
					{renderLinkCards(kubok2007Links)}

					<h2>Кубок Интеллекта 2008</h2>
					{renderLinkCards(kubok2008Links)}

					<h2>Прочее</h2>
					{renderFileCards([
						{ title: 'Эволюция. Концепция игры', url: 'https://vladimirkhil.com/content/docs/EVOLUTION.pdf' },
					])}
				</>
			)}
		</div>
	);
};

export default Files;