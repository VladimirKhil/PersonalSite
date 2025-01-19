import * as React from 'react';

import './Selector.css';

interface SelectorValueOptions<T> {
	value: T;
	name: string;
	tooltip: string;
}

interface SelectorProps<T> {
	data: SelectorValueOptions<T>[];
	value: T;
	className?: string;
	onValueChanged: (newValue: T) => void;
}

export default function Selector<T extends (string | number)>(props: SelectorProps<T>): React.JSX.Element {
	return (
		<div className={`selector ${props.className}`}>
			{props.data.map(item => (
				<button
					type='button'
					key={item.value.toString()}
					className={props.value === item.value ? 'unselectable' : ''}
					disabled={props.value === item.value}
					title={item.tooltip}
					onClick={() => props.onValueChanged(item.value)}>
					{item.name}
				</button>))}
		</div>
	);
}
