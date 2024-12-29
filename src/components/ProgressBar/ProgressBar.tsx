import * as React from 'react';

import './ProgressBar.css';

export default function ProgressBar(): React.JSX.Element {
	return (
		<div className="progress progress-striped active indeterminate" >
			<div className="progress-bar" />
		</div>
	);
}
