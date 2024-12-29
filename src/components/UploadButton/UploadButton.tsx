import * as React from 'react';
import localization from '../../model/resources/localization';

import openFolder from '../../../assets/images/FolderOpen.png';

import './UploadButton.css';

interface UploadButtonProps {
	disabled?: boolean;

	onClick: () => void;
}

export default function UploadButton(props: UploadButtonProps): React.JSX.Element | null {
	if (!window.FileReader) {
		return null;
	}

	return (
		<button
			className="uploadButton"
			title={localization.upload}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			<img height="15" src={openFolder} alt={localization.upload} />
		</button>
	);
}
