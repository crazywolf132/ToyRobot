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
const _ValidCommands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
const _Map = generateMap();
let firstMove = true;
log(_Map);
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
