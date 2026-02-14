import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

import './TagsView.scss';

const TagsView: React.FC = () => {
	const blogs = useAppSelector(state => state.blogs);

	useEffect(() => {
		document.title = localization.tags;
	}, []);

	return (
		<div className='tags-view'>
			<h1>{localization.tags}</h1>

			<div className='tags-grid'>
				{blogs.tags.map(tag => (
					<Link
						key={tag.id}
						to={`/blog/tags/${tag.id}`}
						className='tags-card'
					>
						{tag.value}
					</Link>
				))}
			</div>
		</div>
	);
};

export default TagsView;
