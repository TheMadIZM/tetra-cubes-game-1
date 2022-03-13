import React, { useRef, useEffect, useCallback, useState } from 'react';
import cn from 'bem-cn-lite';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Cube } from '../../pages/ChooseCubePage/ChooseCubePage';
import TetrisCanvas from './TetrisCanvas/TetrisCanvas';
import TetrisControllers from './TetrisControllers/TetrisControllers';
import ClassicTetris from '../../units/tetris/classic-tetris';

import { LIGHT_GRAY, DARK_GRAY, NOTDARK_GRAY } from '../../constants';

import './index.scss';

const b = cn('tetris');

Tetris.propTypes = {
	cube: PropTypes.objectOf({
		src: PropTypes.string,
		name: PropTypes.string,
	}),
	colors: PropTypes.object,
	onChangeCube: PropTypes.func,
};

function Tetris(props) {
	const tetris = useRef(null);
	const [level, setLevel] = useState(5);
	const [isStarted, setIsStarted] = useState(false);
	const { cube, colors, onChangeCube } = props;

	const onGameOver = useCallback(() => {
		setIsStarted(false);
	}, []);

	useEffect(() => {
		const canvas = document.getElementById('canvas');

		const tetrisConfig = {
			pieceColors: colors,
			borderColor: LIGHT_GRAY,
			gridColor: 'transparent',
			tetrisBackgroundColor: 'transparent',
			backgroundColor: 'transparent',
			canvasFont: '17px "Press Start 2P"',
			canvasFontColor: DARK_GRAY,
			ghostColor: [LIGHT_GRAY, 'transparent'],
			gameOverColor: [NOTDARK_GRAY],
		};

		tetris.current = new ClassicTetris(canvas, tetrisConfig);

		tetris.current.on(ClassicTetris.GAME_OVER, onGameOver);

		return () => {
			tetris.current.off(ClassicTetris.GAME_OVER, onGameOver);
		};
	}, [colors, level, onGameOver]);

	const onStart = useCallback(() => {
		tetris.current.setStartLevel(level);
		tetris.current.togglePlayPause();
		setIsStarted(true);
	}, [level]);

	const onQuit = useCallback(() => {
		tetris.current.quit();
		setIsStarted(false);
	}, []);

	return (
		<div className={b()}>
			<Row xs='auto'>
				<Col>
					<TetrisCanvas />
					<TetrisControllers
						onStart={onStart}
						onQuit={onQuit}
						onChangeCube={onChangeCube}
						isStarted={isStarted}
						onChangeLevel={setLevel}
						level={level}
						className={b('controllers')}
					/>
				</Col>
				<Col>
					<div className={b('cube-info')}>
						<span className='text-secondary'>Selected cube</span>
						<Cube {...cube} />
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Tetris;
