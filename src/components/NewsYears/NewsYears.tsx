import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

import './NewsYears.scss';

const NewsYears: React.FC = () => {
	const news = useAppSelector(state => state.news);

	useEffect(() => {
		document.title = localization.websiteNews;
	}, [news.year]);

	return (
		<div className='news-years'>
			<h1>{localization.websiteNews}</h1>

			<div className='news-years-grid'>
				{news.years.map((year, index) => (
					<Link key={index} to={'/news/' + year} className='news-year-card'>
						{year}
					</Link>
				))}
			</div>
		</div>
	);
};

export default NewsYears;