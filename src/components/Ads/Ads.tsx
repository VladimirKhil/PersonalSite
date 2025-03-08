import React from 'react';
import Config from '../../model/Config';

import './Ads.scss';

const Ads: React.FC = () => {
	return <div className="ads">
		<div id="yandex_rtb_R-A-250473-1"></div>

		<script>
			{`
				window.yaContextCb.push(() => {
					Ya.Context.AdvManager.render({
						"blockId": "R-A-250473-1",
						"renderTo": "yandex_rtb_R-A-250473-1"
					});
				});
			`}
		</script>
</div>;
};

export default Ads;