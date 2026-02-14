import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';

import './BlogMainView.scss';

const TEXT_LIMIT = 300;
const WORDS_PER_MINUTE = 200;
const BLOG_ENTRIES_LIMIT = 10;

function stripHtml(html: string): string {
	const tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
}

function estimateReadingTime(text: string): number {
	const plainText = stripHtml(text);
	const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
	return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function extractFirstImage(html: string): string | null {
	const match = html.match(/<img[^>]+src="([^"]+)"/);
	return match ? match[1] : null;
}

function trimText(text: string, limit: number): string {
	const plainText = stripHtml(text);
	return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
}

const BlogMainView: React.FC = () => {
	const blogs = useAppSelector(state => state.blogs);

	useEffect(() => {
		document.title = localization.blog;
	}, []);

	return (
		<div className='blog-main'>
			{blogs.tags.length > 0 && (
				<div className='blog-main-tags'>
					<h2 className='blog-main-tags-title'>{localization.tags}</h2>
					<div className='blog-main-tags-grid'>
						{blogs.tags.map(tag => (
							<Link
								key={tag.id}
								to={`/blog/tags/${tag.id}`}
								className='blog-main-tag'
							>
								{tag.value}
							</Link>
						))}
					</div>
				</div>
			)}

			<div className='blog-main-entries'>
				{blogs.entriesPage.entries.slice(0, BLOG_ENTRIES_LIMIT).map((entry, index) => {
					const image = extractFirstImage(entry.text);
					const readingTime = estimateReadingTime(entry.text);

					return (
						<article key={index} className='blog-main-entry'>
							<div className='blog-main-entry-content'>
								<h2 className='blog-main-entry-title'>
									<Link to={`/blog/${entry.id}`}>{entry.title}</Link>
								</h2>

								<div className='blog-main-entry-meta'>
									<span className='blog-main-entry-date'>
										{new Date(entry.dateTime).toLocaleDateString()}
									</span>
									<span className='blog-main-entry-separator'>•</span>
									<span className='blog-main-entry-reading-time'>
										{localization.readingTime.replace('{0}', readingTime.toString())}
									</span>
								</div>

								<p className='blog-main-entry-excerpt'>
									{trimText(entry.text, TEXT_LIMIT)}
								</p>

								{entry.tags.length > 0 && (
									<div className='blog-main-entry-tags'>
										{entry.tags.map((tag, tagIndex) => (
											<Link
												key={tagIndex}
												to={`/blog/tags/${tag.id}`}
												className='blog-main-entry-tag'
											>
												{tag.value}
											</Link>
										))}
									</div>
								)}
							</div>

							{image && (
								<div className='blog-main-entry-image'>
									<img src={image} alt={entry.title} />
								</div>
							)}
						</article>
					);
				})}
			</div>
		</div>
	);
};

export default BlogMainView;
