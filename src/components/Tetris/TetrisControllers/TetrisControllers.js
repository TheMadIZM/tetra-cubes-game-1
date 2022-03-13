import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import cn from 'bem-cn-lite';

import './TetrisControllers.scss';

const b = cn('tetris-controllers');

TetrisControllers.propTypes = {
	isStarted: PropTypes.bool,
	onStart: PropTypes.func,
	onQuit: PropTypes.func,
	onChangeCube: PropTypes.func,
	level: PropTypes.number,
	onChangeLevel: PropTypes.func,
	size: PropTypes.string,
	className: PropTypes.string,
};

export default function TetrisControllers(props) {
	const {
		isStarted,
		onStart,
		onQuit,
		onChangeCube,
		level,
		onChangeLevel,
		size = 'sm',
		className,
	} = props;

	return (
		<div className={b(null, className)}>
			<Row xs={1} sm='auto'>
				<Col>
					<Button
						variant='primary'
						size={size}
						onClick={onStart}
						className={b('controller')}
					>
						Start/Pause
					</Button>
				</Col>
				<Col>
					<Button
						variant='secondary'
						size={size}
						onClick={onChangeCube}
						className={b('controller')}
					>
						Change&nbsp;cube
					</Button>
				</Col>
				<Col>
					<Button
						variant='secondary'
						size={size}
						onClick={onQuit}
						className={b('controller')}
					>
						Restart
					</Button>
				</Col>
				<Col>
					{!isStarted && (
						<Form.Select
							aria-label='Select level'
							size={size}
							onChange={(event) => onChangeLevel(event.target.value)}
							value={level}
							className={b('controller')}
						>
							<option value={5} key='default'>
								Difficulty
							</option>
							{new Array(20).fill(0).map((_val, index) => {
								return (
									<option key={index} value={index}>
										{index}
									</option>
								);
							})}
						</Form.Select>
					)}
				</Col>
			</Row>
		</div>
	);
}
