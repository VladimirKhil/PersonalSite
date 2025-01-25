import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

import './AppFamilyView.scss';
import TabControl from '../TabControl/TabControl';
import { loadApp, loadReleasesPage } from '../../state/appFamilySlice';
import localization, { getCulture } from '../../model/resources/localization';
import Pagination from '../Pagination/Pagination';

const AppFamilyView: React.FC = () => {
	const appFamilyState = useAppSelector(state => state.appFamily);
	const appDispatch = useAppDispatch();
	const appFamilyId = appFamilyState.appFamilyId;
	const appFamily = appFamilyState.appFamilies.find(family => family.id === appFamilyId);
	const app = appFamilyState.apps.find(app => app.id === appFamilyState.appId);
	const activeAppIndex = appFamilyState.apps.findIndex(app => app.id === appFamilyState.appId);

	useEffect(() => {
		if (appFamily?.name) {
			document.title = appFamily?.name;
		}
	}, [appFamily]);

	if (!appFamily) {
		return <div>{localization.familyNotFound}</div>;
	}

	const apps = appFamilyState.apps;

	const installerVersions = Array.from(new Set(appFamilyState.installers.map(installer => installer.release?.version)));

	function getOSVersion(version: string | undefined): React.ReactNode {
		const release = appFamilyState.releases.find(release => release.version === version);
		const minimumOSVersion = release?.minimumOSVersion;

		switch (minimumOSVersion) {
			case '5.0.1000': return 'Windows XP ' + localization.andLater;
			case '6.0.0': return 'Windows 7 ' + localization.andLater;
			case '10.0.0': return 'Windows 10 ' + localization.andLater;
			default: return minimumOSVersion;
		}
	}

	return (
		<div>
			<h1>
				<img className='app-family-logo' src={appFamily.logoUri} alt={appFamily.name} />

				<div className='app-family-title'>
					<div className='app-family-name'>{appFamily.name}</div>
					<div className='app-family-description'>{appFamily.description}</div>
				</div>
			</h1>

			{apps.length > 1 ?
				<div className='app-list'>
					<TabControl
						tabs={appFamilyState.apps.map((app, index) => ({ id: index, label: app.name ?? '' }))}
						activeTab={activeAppIndex}
						onTabClick={index => appDispatch(loadApp(apps[index].id))}
					/>
				</div>
			: null}

			<div>
				{installerVersions.map(version =>
					<div>
						<div className='app-install-version'>{localization.version} {version}</div>
						<div className='app-requirements'>{getOSVersion(version)}</div>

						{appFamilyState.installers
							.map(({ installer, release }) => release?.version === version ?
							<div key={installer?.id}>
								<div>{installer?.title}</div>
								<a className='app-install' href={installer?.uri}>{installer?.description ?? localization.install}</a>
								{installer?.size ? <div className='app-install-size'>{Math.ceil(installer?.size / 1024 / 1024)} MB</div> : null}
								{installer?.additionalSize ? <div className='app-install-size'>+{Math.ceil(installer?.additionalSize / 1024 / 1024)} MB</div> : null}
							</div>
							: null
						)}
					</div>
				)}
			</div>

			<h2>{localization.screenshots}</h2>

			<div className='app-screenshots'>
				{appFamilyState.screenshots.map(uri =>
					<img key={uri} src={uri} alt='screenshot' />
				)}
			</div>

			{appFamily.details ?
				<>
					<h2>{localization.details}</h2>

					<div className='app-details'>
						<div dangerouslySetInnerHTML={{ __html: appFamily.details ?? '' }} />
					</div>
				</>
				: null}

			{app?.knownIssues
			 ? <>
					<h2>{localization.knownIssues}</h2>

					<div className='app-known-issues'>
						<div dangerouslySetInnerHTML={{ __html: app?.knownIssues ?? '' }} />
					</div>
				</>
			: null}

			{localization.getLanguage() === 'ru'
				? <>
					<h2>{localization.releaseHistory}</h2>

					<Pagination
						currentPage={appFamilyState.releasePage}
						totalPages={Math.ceil(appFamilyState.totalReleases / 40)}
						onPageChange={page => appDispatch(loadReleasesPage({ appId: appFamilyState.appId, page }))} />

					<div className='app-releases'>
						{appFamilyState.releases.map(release =>
							<div className='app-release' key={release.id}>
								<h3>{release.version} ({release.publishDate?.toLocaleString()})</h3>
								<div dangerouslySetInnerHTML={{ __html: release.notes ?? '' }} />
							</div>
						)}
					</div>
				</>
				: null}
		</div>
	);
};

export default AppFamilyView;