import React, { useEffect } from 'react';
import localization from '../../model/resources/localization';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';

import './ProductsView.scss';

interface Product {
	name: string;
	description: string;
	path: string;
	appFamilyId?: string;
	colorClass: string;
}

const ProductsView: React.FC = () => {
	const appFamilies = useAppSelector(state => state.appFamily.appFamilies);

	useEffect(() => {
		document.title = localization.products;
	}, []);

	const products: Product[] = [
		{
			name: 'SIGame',
			description: localization.siGameDescription,
			path: '/si/game',
			appFamilyId: '16d03adf-18f1-4aa5-a6cd-3b25b5f86d4c',
			colorClass: 'product-badge--sigame',
		},
		{
			name: 'SIQuester',
			description: localization.siQuesterDescription,
			path: '/si/siquester',
			appFamilyId: 'b89345d8-527a-4c2e-abd1-09c5b856aeaa',
			colorClass: 'product-badge--siquester',
		},
		{
			name: 'SImulator',
			description: localization.siSimulatorDescription,
			path: '/si/simulator',
			appFamilyId: '4d822142-6533-4f09-8131-5daf29d1d10d',
			colorClass: 'product-badge--simulator',
		},
		{
			name: 'CIRCe',
			description: localization.circeDescription,
			path: '/circe',
			appFamilyId: 'acabc1c3-cbd3-4103-bbeb-799f7e1d88d5',
			colorClass: 'product-badge--circe',
		},
		{
			name: localization.spardTransformer,
			description: localization.spardDescription,
			path: '/lingware/spard/implementation',
			colorClass: 'product-badge--spard',
		},
		{
			name: localization.spardTableTransformer,
			description: localization.spardDescription,
			path: '/lingware/spard/table',
			colorClass: 'product-badge--spard',
		},
	];

	function getLogoUri(appFamilyId?: string): string | undefined {
		if (!appFamilyId) return undefined;
		const family = appFamilies.find(f => f.id === appFamilyId);
		return family?.logoUri;
	}

	return (
		<div className='products-view'>
			<h1>{localization.products}</h1>

			<div className='products-grid'>
				{products.map(product => {
					const logoUri = getLogoUri(product.appFamilyId);

					return (
						<Link key={product.path} to={product.path} className='product-card'>
							{logoUri ? (
								<img className='product-card-logo' src={logoUri} alt={product.name} />
							) : (
								<div className={`product-card-badge ${product.colorClass}`}>
									{product.name.charAt(0)}
								</div>
							)}
							<div className='product-card-info'>
								<h2 className='product-card-name'>{product.name}</h2>
								<p className='product-card-desc'>{product.description}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default ProductsView;
