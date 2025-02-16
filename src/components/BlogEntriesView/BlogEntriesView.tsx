import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

import './BlogEntriesView.scss';

const TEXT_LIMIT = 750;

function trimHtml(text: string, TEXT_LIMIT: number): string | TrustedHTML {
	const trimmedText = text.length > TEXT_LIMIT ? text.substring(0, TEXT_LIMIT) + '...' : text;
	return trimmedText;
}

const BlogEntriesView: React.FC = () => {
	const blogs = useAppSelector(state => state.blogs);
	const tag = blogs.tags.find(tag => tag.id === blogs.tagId);

	useEffect(() => {
		if (tag?.value) {
			document.title = tag?.value;
		}
	}, [tag]);

	return (
		<div>
			<h1>{tag?.value ?? localization.blog}</h1>

			{blogs.entriesPage.entries.map((entry, index) => (
				<div key={index}>
					<h2 className='entry-title'><Link to={'/blog/' + entry.id}>{entry.title}</Link></h2>
					<div className='entry-date'>{new Date(entry.dateTime).toLocaleDateString()}</div>
					<div className='entry-text' dangerouslySetInnerHTML={{ __html: trimHtml(entry.text, TEXT_LIMIT) }} />

					{entry.tags.length > 0
						? <div>
							<span className='entry-tags'>{localization.tags}: </span>
							{entry.tags.map((tag, index) => (
								<span key={index}>{tag.value}</span>
							))}
						</div>
						: null}
				</div>
			))}
		</div>
	);
};

export default BlogEntriesView;