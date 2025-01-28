import LocalizedStrings from 'localized-strings';

export function getCulture(): string {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('culture') || '';
}

const localization = new LocalizedStrings({
	en: {
		andLater: 'and later',
		buildTransformTable: 'Ganarate transformation table',
		classicTransform: 'Classic transform',
		details: 'Details',
		hint: 'You can tranform input text with the SPARD language rules described here.',
		inputText: 'Input text',
		install: 'Install',
		isClassicResultNotTheSame: 'Classic transform got the same result',
		isClassicResultTheSame: 'Classic transform got different result',
		familyNotFound: 'App not found',
		generateSourceCode: 'Generate source code',
		home: 'Home',
		knownIssues: 'Known issues',
		languageEn: 'English',
		languageRu: 'Русский',
		releaseHistory: 'Release history',
		result: 'Result',
		screenshots: 'Screenshots',
		selectExample: 'Select an example…',
		selectFile: 'Select file…',
		spardTableDescription: 'This transformer works with SPARD subset - SPARD Lite which includes symbols, strings and operators |, _, $, :: и =>.',
		spardTableHint: 'Is is equal to the classic (tree-based) SPARD-transformer but has a bigger performance. But additional time for building it is required.',
		spardTableTransformer: 'SPARD table transformer',
		spardTransformer: 'SPARD transformer',
		tableTransform: 'Table transform',
		transform: 'Transform',
		transformationRules: 'Transformation rules (SPARD)',
		transformationRulesLight: 'Transformation rules (SPARD Lite)',
		transformationTime: 'transformation time',
		upload: 'Upload…',
		version: 'Version',
		webBrowser: 'Web browser',
	},
	ru: {
		andLater: 'и выше',
		buildTransformTable: 'Составить таблицу переходов',
		classicTransform: 'Классическое преобразование',
		details: 'Описание',
		hint: 'На этой странице можно осуществить преобразование входного текста в соответствии с заданными правилами преобразования (на языке SPARD).',
		inputText: 'Входной текст',
		install: 'Установить',
		isClassicResultNotTheSame: 'классический преобразователь дал другой результат',
		familyNotFound: 'Приложение не найдено',
		isClassicResultTheSame: 'классический преобразователь дал такой же результат',
		generateSourceCode: 'Создать код',
		home: 'Главная',
		knownIssues: 'Известные проблемы и решения',
		languageEn: 'English',
		languageRu: 'Русский',
		releaseHistory: 'История версий',
		result: 'Результат',
		screenshots: 'Галерея',
		selectExample: 'Выберите пример…',
		selectFile: 'Выберите файл…',
		spardTableDescription: 'Преобразователь работает на подмножестве SPARD - SPARD Lite, включающем в себя символы, строки и операции |, _, $, :: и =>.',
		spardTableHint: 'Аналогичен классическому (древовидному) SPARD-преобразователю, но работает более эффективно. При этом затрачивается дополнительное время на его построение.',
		spardTableTransformer: 'Табличный преобразователь SPARD',
		spardTransformer: 'Преобразователь SPARD',
		tableTransform: 'Табличное преобразование',
		transform: 'Преобразовать',
		transformationRules: 'Правила преобразования (SPARD)',
		transformationRulesLight: 'Правила преобразования (SPARD Lite)',
		transformationTime: 'время преобразования',
		upload: 'Загрузить…',
		version: 'Версия',
		webBrowser: 'Веб-браузер',
	}
},
{
	customLanguageInterface: getCulture
});

export default localization;
