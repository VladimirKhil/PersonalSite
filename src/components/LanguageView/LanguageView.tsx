import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { languageChanged } from '../../state/settingsSlice';
import Selector from '../Selector/Selector';
import localization from '../../model/resources/localization';

import './LanguageView.css';

export default function LanguageView(): React.JSX.Element {
	const culture = useAppSelector(state => state.settings.culture || localization.getLanguage());
	const appDispatch = useAppDispatch();

	function onLanguageChanged(language: string | null): void {
		appDispatch(languageChanged(language));
	}

	return (
		<Selector
			className='language-area'
			data={[{
				value: 'ru',
				name: 'РУ',
				tooltip: localization.languageRu
			}, {
				value: 'en',
				name: 'EN',
				tooltip: localization.languageEn
			}, {
				value: 'sr',
				name: 'SR',
				tooltip: localization.languageSr
			}]}
			value={culture}
			onValueChanged={onLanguageChanged}
		/>
	);
}