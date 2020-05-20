import chalk from 'chalk';
import { BROKEN_THE_GAME_ERROR } from './errors';

const log = console.log;
const error = chalk.bgRed;

export const generateMap = () => {
	let startingMap = new Array(5).fill([]);

	startingMap = startingMap.map((row) => {
		row = new Array(5).fill(0);
		return row;
	});
	return startingMap;
};
export const validMove = (newCoordinates) => {
	return (
		newCoordinates.x >= 0 &&
		newCoordinates.y >= 0 &&
		newCoordinates.x <= 5 &&
		newCoordinates.y <= 5
	);
};
