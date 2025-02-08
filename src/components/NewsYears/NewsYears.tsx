import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

const NewsYears: React.FC = () => {
	const news = useAppSelector(state => state.news);

	useEffect(() => {
		document.title = localization.websiteNews;
	}, [news.year]);

	return (
		<div>
			<h1>{localization.websiteNews}</h1>

			<ul>
				{news.years.map((year, index) => (
					<li key={index}>
						<Link to={'/news/' + year}>{year}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NewsYears;