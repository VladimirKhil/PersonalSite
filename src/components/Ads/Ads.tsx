import React from 'react';
import Config from '../../model/Config';

import './Ads.scss';

declare const config: Config;

declare const onLoad: () => void;

const Ads: React.FC = () => {
	React.useEffect(() => {
		if (typeof onLoad === 'function') {
			onLoad();
		}
	}, []);

	return <div className="ads" dangerouslySetInnerHTML={{ __html: config && config.ads ? config.ads : '' }} />;
};

export default Ads;