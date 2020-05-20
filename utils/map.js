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
