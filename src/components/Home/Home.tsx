import React, { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

import './Home.scss';

const TEXT_LIMIT = 300;
const WORDS_PER_MINUTE = 200;
const HOME_ENTRIES_LIMIT = 10;

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

function trimHtml(text: string, limit: number): string {
	const plainText = stripHtml(text);
	const trimmed = plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
	return trimmed;
}

const Home: React.FC = () => {
	const blogs = useAppSelector(state => state.blogs);

	useEffect(() => {
		document.title = localization.home;
	}, []);

	return (
		<div className='home'>
			<div className='home-content'>
				<div className='home-blog'>
					<div className='home-entries'>
						{blogs.entriesPage.entries.length > 0 ? (
							blogs.entriesPage.entries.slice(0, HOME_ENTRIES_LIMIT).map((entry, index) => {
								const image = extractFirstImage(entry.text);
								const readingTime = estimateReadingTime(entry.text);

								return (
									<article key={index} className='home-entry'>
										<div className='home-entry-content'>
											<h2 className='home-entry-title'>
												<Link to={`/blog/${entry.id}`}>{entry.title}</Link>
											</h2>

											<div className='home-entry-meta'>
												<span className='home-entry-date'>
													{new Date(entry.dateTime).toLocaleDateString()}
												</span>
												<span className='home-entry-separator'>•</span>
												<span className='home-entry-reading-time'>
													{localization.readingTime.replace('{0}', readingTime.toString())}
												</span>
											</div>

											<p className='home-entry-excerpt'>
												{trimHtml(entry.text, TEXT_LIMIT)}
											</p>

											{entry.tags.length > 0 && (
												<div className='home-entry-tags'>
													{entry.tags.map((tag, tagIndex) => (
														<Link
															key={tagIndex}
															to={`/blog/tags/${tag.id}`}
															className='home-entry-tag'
														>
															{tag.value}
														</Link>
													))}
												</div>
											)}
										</div>

										{image && (
											<div className='home-entry-image'>
												<img src={image} alt={entry.title} />
											</div>
										)}
									</article>
								);
							})
						) : (
							<p className='home-no-entries'>{localization.noEntries}</p>
						)}
					</div>
				</div>

				<Sidebar />
			</div>
		</div>
	);
};

export default Home;
