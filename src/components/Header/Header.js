import React from 'react';
import cn from 'bem-cn-lite';

import './Header.scss';

const b = cn('tc-header');

export default function Header(props) {
	return (
		<div className={b()}>
			<h1 className={b('logo-title')}>TETRA CUBES, THE GAME</h1>
			<div className={b('right', 'd-none d-md-flex')}>{props.children}</div>
		</div>
	);
}

Header.propTypes = {
	children: React.Children,
};
