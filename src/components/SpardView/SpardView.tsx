import * as React from 'react';
import SpardExampleBaseInfo from 'spard-client/dist/models/SpardExampleBaseInfo';
import localization from '../../model/resources/localization';
import { onInputChanged, onTransformChanged, runTransform, selectExample } from '../../state/spardSlice';
import { RootState } from '../../state/store';
import TextView from '../TextView/TextView';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

import './SpardView.css';

const defaultExample: SpardExampleBaseInfo = {
	id: -1,
	name: localization.selectExample
};

export default function SpardView(): React.JSX.Element {
	const state = useAppSelector((state: RootState) => state.spard);
	const dispatch = useAppDispatch();
	const canTransform = state.input.length > 0 && state.transform.length > 0;

	return (
		<div>
			<header><h1>{localization.spardTransformer}</h1></header>

			<main>
				<p>{localization.hint}</p>

				<div>
					<select
						className="spard_examples"
						title={localization.selectExample}
						value={state.selectedExampleId}
						disabled={state.inProgress}
						onChange={e => dispatch(selectExample(parseInt(e.target.value, 10)))}
					>
						{[defaultExample].concat(state.examples).map(example => (
							<option key={example.id} value={example.id}>{example.name}</option>
						))}
					</select>

					<input
						type="button"
						className="run_button"
						value={localization.transform}
						disabled={!canTransform || state.inProgress}
						onClick={() => dispatch(runTransform())}
					/>

					{state.inProgress ? (
						<div className="progress_bar_host">
							<ProgressBar />
						</div>
					) : null}
				</div>

				<div className="spard_table">
					<TextView
						header={localization.inputText}
						text={state.input}
						disabled={state.inProgress}
						onTextChanged={text => dispatch(onInputChanged(text))}
					/>

					<div className='spard_text_host'>
						<div className="spard_text_header">
							<span>{localization.result}</span>

							<span className="spard_result_duration">
								{state.result.duration.length > 0 ? `(${state.result.duration})` : ''}
							</span>
						</div>

						<textarea className="spard_text_editor" wrap="off" defaultValue={state.result.result} readOnly title={localization.result} />
					</div>
				</div>

				<TextView
					header={localization.transformationRules}
					text={state.transform}
					disabled={state.inProgress}
					onTextChanged={text => dispatch(onTransformChanged(text))}
				/>
			</main>
		</div>
	);
}
