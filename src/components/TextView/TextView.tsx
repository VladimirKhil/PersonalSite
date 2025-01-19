import * as React from 'react';
import localization from '../../model/resources/localization';
import UploadButton from '../UploadButton/UploadButton';

import './TextView.css';

interface TextViewProps {
	header: string;
	text: string;
	disabled?: boolean;

	onTextChanged: (text: string) => void;
}

export default class TextView extends React.Component<TextViewProps> {
	private fileRef: React.RefObject<HTMLInputElement | null>;

	constructor(props: TextViewProps) {
		super(props);

		this.fileRef = React.createRef<HTMLInputElement>();
	}

	private handleDragOver(e: React.DragEvent<HTMLTextAreaElement>) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	private handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
		e.stopPropagation();
		e.preventDefault();

		const files = e.dataTransfer.files;
		this.loadFiles(files);
	}

	private onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			this.loadFiles(e.target.files);
		}
	};

	private loadFiles = (files: FileList) => {
		if (files.length === 0) {
			return;
		}

		const file = files[0];
		const reader = new FileReader();

		reader.onload = () => {
			this.props.onTextChanged(reader.result as string);
		};

		reader.readAsText(file);
	}

	private openFile = () => {
		if (this.fileRef.current) {
			this.fileRef.current.click();
		}
	}

	render(): React.JSX.Element {
		return (
			<div className="spard_text_host">
				<div className="spard_text_header">
					<span>{this.props.header}</span>
					<UploadButton disabled={this.props.disabled} onClick={this.openFile} />
				</div>

				<textarea
					className="spard_text_editor"
					wrap="off"
					title={localization.inputText}
					value={this.props.text}
					disabled={this.props.disabled}
					onChange={e => this.props.onTextChanged(e.target.value)}
					onDragOver={this.handleDragOver}
					onDrop={this.handleDrop}
				/>

				<input
					ref={this.fileRef}
					type="file"
					accept="text/plain"
					title={localization.selectFile}
					onChange={this.onFileSelected}
				/>
			</div>
		);
	}
}
