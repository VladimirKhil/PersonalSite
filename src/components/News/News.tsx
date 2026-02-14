import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';

import './News.scss';

const News: React.FC = () => {
	const news = useAppSelector(state => state.news);

	const title = localization.newsForTheYear.replace('{0}', news.year.toString());

	useEffect(() => {
		document.title = title;
	}, [news.year]);

	return (
		<div className='news-view'>
			<h1>{title}</h1>

			<div className='news-list'>
				{news.news.map((item, index) => (
					<div key={index} className='news-card'>
						<div className='news-card-date'>{new Date(item.dateTime).toLocaleDateString()}</div>
						<div className='news-card-text' dangerouslySetInnerHTML={{ __html: item.text }} />
					</div>
				))}
			</div>
		</div>
	);
};

export default News;