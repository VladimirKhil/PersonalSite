import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare const onHit: () => void;

const NavigationWatcher: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		if (typeof onHit === 'function') {
			onHit();
		}
	}, [location]);

	return null;
};

export default NavigationWatcher;