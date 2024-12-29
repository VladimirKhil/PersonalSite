import * as React from 'react';
import localization from '../../model/resources/localization';
import { generateSourceCode, generateTable, onInputChanged, onTransformChanged, runTransform, } from '../../state/spardTableSlice';
import { RootState } from '../../state/store';
import TextView from '../TextView/TextView';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

import './SpardTableView.css';

export default function SpardTableView(): React.JSX.Element {
	const state = useAppSelector((state: RootState) => state.spardTable);
	const dispatch = useAppDispatch();
	const canTransform = state.input.length > 0 && state.transform.length > 0;

	return (
		<>
			<p>{localization.spardTableHint}</p>
			<p>{localization.spardTableDescription}</p>
			<div className="buttons_host">
				<input
					type="button"
					value={localization.transform}
					disabled={!canTransform || state.inProgress}
					onClick={() => dispatch(runTransform())}
				/>
				<input
					type="button"
					value={localization.buildTransformTable}
					disabled={state.input.length === 0 || state.inProgress}
					onClick={() => dispatch(generateTable())}
				/>
				<input
					type="button"
					value={localization.generateSourceCode}
					disabled={state.input.length === 0 || state.inProgress}
					onClick={() => dispatch(generateSourceCode())}
				/>
				{state.inProgress ? (
					<div className="table_progress_bar_host">
						<ProgressBar />
					</div>
				) : null}
			</div>
			<div className="spard_table_table">
				<TextView
					header={localization.inputText}
					text={state.input}
					disabled={state.inProgress}
					onTextChanged={text => dispatch(onInputChanged(text))}
				/>
				<div>
					<div className="spard_table_result_host">
						<span>{localization.result}</span>
					</div>
					<textarea className="spard_text_editor" wrap="off" defaultValue={state.result} readOnly title={localization.result} />
				</div>
			</div>
			<div className="spard_table_result_duration">
				{state.outputInfo}
			</div>
			<TextView
				header={localization.transformationRulesLight}
				text={state.transform}
				disabled={state.inProgress}
				onTextChanged={text => dispatch(onTransformChanged(text))}
			/>
		</>
	);
}
