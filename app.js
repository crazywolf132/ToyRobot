import { createInterface } from 'readline';
import { generateMap } from './utils/map';
import chalk from 'chalk';

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
let _Map;

// Used to store the Current position. Ultimately, this could be an INT, and the LIST be an ENUM
// But as there is only 4 possible choices, it simply isnt worth it.
let currentDirection = '';
// Used to work out if we need to ignore other commands or not.
let firstMove = true;
const prompt = () => {
	rl.question('> ', (userInput) => {
		handleInput(userInput);
		prompt(); // Calling this function again to recursively run.
	});
};

const StartGame = () => {
	// This is used to generate the map, then prompt the user...
	_Map = generateMap();
	prompt();
};

StartGame();
