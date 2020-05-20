import chalk from 'chalk';
import { BROKEN_THE_GAME_ERROR, PLEASE_CHOOSE_A_VALID_X_Y } from './errors';

const log = console.log;
const error = chalk.bgRed;

/**
 * Generates a new 2D array full of `0`'s
 * The default values are set to 5.
 */
export const generateMap = () => {
	let startingMap = new Array(5).fill([]);

	startingMap = startingMap.map((row) => {
		row = new Array(5).fill(0);
		return row;
	});

	return startingMap;
};

/**
 * This function is used for placing the robot at a specific position in the map...
 * only if the values are valid...
 * @param {2D Array} map
 * @param {INT} x
 * @param {INT} y
 */
export const placeRobot = (map, x, y) => {
	if (x < 5 && x >= 0 && y < 5 && y >= 0) {
		// This means they are valid numbers...
		// Only if the numbers are valid, will we change the map...

		// Checking to see if there is currently another robot on the map...
		// If there is, we will regenerate the map...
		if (getPosition(map)) {
			map = generateMap();
		}

		// Changing the given position to a '1' to signify that this is the robot.
		map[x][y] = 1;
	} else {
		// The provided values werent valid, so we are letting the user know.
		log(error(PLEASE_CHOOSE_A_VALID_X_Y));
		// Returning -1 to signify there was an error.
		return -1;
	}

	// We are returning the map, regardless of it was actually updated or not.
	return map;
};

/**
 * Will go through the X & Y of the Map searching for a `1`,
 * It will then return a currrentCoordinates Object {x, y}
 * @param {Array} 2D Map Array
 * @returns {Object} currentCoordinates
 */
export const getPosition = (map) => {
	// Going though the X
	for (var x = 0; x < map.length; x++) {
		// Going through the Y
		for (var y = 0; y < map[x].length; y++) {
			// We only need to find one '1', so we will just return
			// as soon as we find it.
			if (map[x][y] == 1) {
				return { x, y };
			}
		}
	}
	return false;
};

export const generateNewCoordinates = (currentPosition, direction) => {
	switch (direction.toUpperCase()) {
		case 'NORTH':
			return { x: currentPosition.x - 1, y: currentPosition.y };
		case 'SOUTH':
			return { x: currentPosition.x + 1, y: currentPosition.y };
		case 'EAST':
			return { x: currentPosition.x, y: currentPosition.y + 1 };
		case 'WEST':
			return { x: currentPosition.x, y: currentPosition.y - 1 };
		default:
			log(error(BROKEN_THE_GAME_ERROR));
	}
};

/**
 * Checks a given Object (Coordinate Object {x : 0, y: 0}) to see if it is
 * between 0-5 on both the x & y.
 * @param {Object} newCoordinates {x, y}
 */
export const validMove = (newCoordinates) => {
	return (
		newCoordinates.x >= 0 &&
		newCoordinates.y >= 0 &&
		newCoordinates.x <= 5 &&
		newCoordinates.y <= 5
	);
};

export const moveRobot = (map, direction) => {
	// Going to get the current Robot Position
	const position = getPosition(map);

	const newCoordinates = generateNewCoordinates(position, direction);

	// Checking if it is a valid move;
	if (validMove(newCoordinates)) {
		// They are valid, so lets move the robot to them!
		return placeRobot(map, newCoordinates.x, newCoordinates.y);
	}

	// Seems like they werent valid... so lets just return the old map...
	return map;
};
