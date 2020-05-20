import chalk from 'chalk';
import { NOT_ENOUGH_COORDINATES, NOT_VALID_DIRECTION_NAME } from './errors';
import { placeRobot, moveRobot, getPosition } from './map';

const log = console.log;
const error = chalk.bgRed;

export const LEFT = (currentDirection, directionList) => {
	let currentDirectionPosition = directionList.indexOf(
		currentDirection.toUpperCase()
	);
	if (currentDirectionPosition > 0) {
		return directionList[currentDirectionPosition - 1];
	} else {
		return directionList[3];
	}
};

export const RIGHT = (currentDirection, directionList) => {
	let currentDirectionPosition = directionList.indexOf(
		currentDirection.toUpperCase()
	);

	if (currentDirectionPosition < 3) {
		return directionList[currentDirectionPosition + 1];
	} else {
		return directionList[0];
	}
};

export const REPORT = (map, currentDirection) => {
	let position = getPosition(map);
	return log(`Output: ${position.x},${position.y},${currentDirection}`);
};
