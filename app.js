import { createInterface } from 'readline';
import { generateMap } from './utils/map';
import chalk from 'chalk';

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
