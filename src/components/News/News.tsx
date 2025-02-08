import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';

const News: React.FC = () => {
	const news = useAppSelector(state => state.news);

	const title = localization.newsForTheYear.replace('{0}', news.year.toString());

	useEffect(() => {
		document.title = title;
	}, [news.year]);

	return (
		<div className='news'>
			<header className='news-header'><h1>{title}</h1></header>

			{news.news.map((item, index) => (
				<div key={index} className='news-item'>
					<h3 className='news-item-date'>{new Date(item.dateTime).toLocaleDateString()}</h3>
					<div className='news-item-title' dangerouslySetInnerHTML={{ __html: item.text }} />
				</div>
			))}
		</div>
	);
};

export default News;