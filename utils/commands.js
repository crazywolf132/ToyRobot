import chalk from 'chalk';
import { NOT_ENOUGH_COORDINATES, NOT_VALID_DIRECTION_NAME } from './errors';
import { placeRobot, moveRobot, getPosition } from './map';

const log = console.log;
const error = chalk.bgRed;

export const PLACE = (map, directionList, currentDirection, userInput) => {
	// Checking for arguments
	let commandList = userInput.split(' ');
	if (commandList.length !== 2) {
		log(error(NOT_ENOUGH_COORDINATES));
		return -1;
	}

	// Checking that all the information is in the argument.
	let postionInfo = commandList[1].toUpperCase().split(',');
	if (postionInfo.length !== 3) {
		log(error(NOT_ENOUGH_COORDINATES));
		return -1;
	}

	// We are here, so this means the information provided is so far correct.
	if (!directionList.includes(postionInfo[2])) {
		log(error(NOT_VALID_DIRECTION_NAME));
		return -1;
	} else {
		currentDirection = postionInfo[2];
	}

	let result = placeRobot(map, postionInfo[0], postionInfo[1]);
	if (result !== -1) {
		return { map, currentDirection };
	} else {
		return -1;
	}
};

export const MOVE = (map, direction) => {
	return moveRobot(map, direction);
};

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
	return console.log(
		`Output: ${position.x},${position.y},${currentDirection}`
	);
};
