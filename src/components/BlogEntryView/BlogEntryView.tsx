import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import Ads from '../Ads/Ads';

const BlogEntryView: React.FC = () => {
	const blogs = useAppSelector(state => state.blogs);
	const { entry } = blogs;

	useEffect(() => {
		if (entry?.title) {
			document.title = entry.title;
		}
	}, [entry]);

	if (!entry) {
		return null;
	}

	return (
		<div>
			<h1 className='entry-title'>{entry.title}</h1>

			<div className='entry-date'>{new Date(entry.dateTime).toLocaleDateString()}</div>
			<div dangerouslySetInnerHTML={{ __html: entry.text }} />

			<Ads />

			{entry.tags.length > 0
				? <div>
					<span className='entry-tags'>{localization.tags}: </span>
					{entry.tags.map((tag, index) => (
						<span key={index}>{tag.value}</span>
					))}
				</div>
				: null}
		</div>
	);
};

export default BlogEntryView;