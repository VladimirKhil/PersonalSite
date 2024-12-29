import LocalizedStrings from 'localized-strings';

export function getCulture(): string {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('culture') || '';
}

const localization = new LocalizedStrings({
	en: {
		buildTransformTable: 'Ganarate transformation table',
		classicTransform: 'Classic transform',
		hint: 'You can tranform input text with the SPARD language rules described here.',
		inputText: 'Input text',
		isClassicResultNotTheSame: 'Classic transform got the same result',
		isClassicResultTheSame: 'Classic transform got different result',
		generateSourceCode: 'Generate source code',
		result: 'Result',
		selectExample: 'Select an example…',
		selectFile: 'Select file…',
		spardTableDescription: 'This transformer works with SPARD subset - SPARD Lite which includes symbols, strings and operators |, _, $, :: и =>.',
		spardTableHint: 'Is is equal to the classic (tree-based) SPARD-transformer but has a bigger performance. But additional time for building it is required.',
		tableTransform: 'Table transform',
		transform: 'Transform',
		transformationRules: 'Transformation rules (SPARD)',
		transformationRulesLight: 'Transformation rules (SPARD Lite)',
		transformationTime: 'transformation time',
		upload: 'Upload…'
	},
	ru: {
		buildTransformTable: 'Составить таблицу переходов',
		classicTransform: 'Классическое преобразование',
		hint: 'На этой странице можно осуществить преобразование входного текста в соответствии с заданными правилами преобразования (на языке SPARD).',
		inputText: 'Входной текст',
		isClassicResultNotTheSame: 'классический преобразователь дал другой результат',
		isClassicResultTheSame: 'классический преобразователь дал такой же результат',
		generateSourceCode: 'Создать код',
		result: 'Результат',
		selectExample: 'Выберите пример…',
		selectFile: 'Выберите файл…',
		spardTableDescription: 'Преобразователь работает на подмножестве SPARD - SPARD Lite, включающем в себя символы, строки и операции |, _, $, :: и =>.',
		spardTableHint: 'Аналогичен классическому (древовидному) SPARD-преобразователю, но работает более эффективно. При этом затрачивается дополнительное время на его построение.',
		tableTransform: 'Табличное преобразование',
		transform: 'Преобразовать',
		transformationRules: 'Правила преобразования (SPARD)',
		transformationRulesLight: 'Правила преобразования (SPARD Lite)',
		transformationTime: 'время преобразования',
		upload: 'Загрузить…'
	}
},
{
	customLanguageInterface: getCulture
});

export default localization;
