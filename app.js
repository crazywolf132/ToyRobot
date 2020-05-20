import { createInterface } from 'readline';
import chalk from 'chalk';
import { generateMap } from './utils/map';
import { BROKEN_THE_GAME_ERROR } from './utils/errors';
import { PLACE, MOVE, LEFT, RIGHT, REPORT } from './utils/commands';

// Setting up logger and readLine
const log = console.log;
const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.setPrompt('> ');

// Setting up variables that should never be changed. Hence the '_' prefix;
const _ValidCommands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
const _Directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
// This is the only exception... As we actively modify the map by our system...
let _Map = generateMap();

// Used to store the Current position. Ultimately, this could be an INT, and the LIST be an ENUM
// But as there is only 4 possible choices, it simply isnt worth it.
let currentDirection = '';
// Used to work out if we need to ignore other commands or not.
let firstMove = true;

const handleInput = (userInput) => {
	if (firstMove) {
		if (!userInput.toUpperCase().includes('PLACE')) {
			return log(
				chalk.bgRed('Please use the PLACE command to start the game!')
			);
		}
	}

	// Checking to see if we have a valid command...
	// Getting the starting of the command
	let command = userInput.split(' ')[0].toUpperCase();
	if (!_ValidCommands.includes(command))
		return log(chalk.bgRed('Please use a valid command.'));

	// As we are here... we assume we are now working with a valid command...
	// We just need to workout which one...

	switch (command) {
		case 'PLACE':
			let result = PLACE(_Map, _Directions, currentDirection, userInput);
			if (result !== -1 && firstMove) {
				firstMove = false;
			}
			// Simple turnary to only change the map if we returned a new map.
			_Map = result.map ? result.map : _Map;
			currentDirection = result.currentDirection
				? result.currentDirection
				: currentDirection;
			break;
		case 'MOVE':
			_Map = MOVE(_Map, currentDirection);
			break;
		case 'LEFT':
			currentDirection = LEFT(currentDirection, _Directions);
			break;
		case 'RIGHT':
			currentDirection = RIGHT(currentDirection, _Directions);
			break;
		case 'REPORT':
			REPORT(_Map, currentDirection);
			return 1;
		default:
			// There should not be a conceivable way of getting here... but just incase, lets handle it.
			return log(chalk.bgYellow(BROKEN_THE_GAME_ERROR));
	}
};

const prompt = () => {
	rl.question('> ', (userInput) => {
		let result = handleInput(userInput);
		if (result === 1) {
			rl.close();
			return process.exit(0);
		} else {
			// Calling this function again to recursively run.
			return prompt();
		}
	});
};

const StartGame = () => {
	// This is used to generate the map, then prompt the user...
	_Map = generateMap();
	prompt();
};

if (!process.env.NODE_ENV === 'test' || process.env.NODE_ENV == undefined)
	StartGame();
