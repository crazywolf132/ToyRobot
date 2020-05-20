// We are importing chalk to compare the console.log
import chalk from 'chalk';
import handleInput from '../app';

/**
 * This one is on its own, as the others all use a `beforeEach` call.
 */
describe('Testing App HandleInput Error', () => {
	it('should fail when the first command is not PLACE', () => {
		expect(handleInput('NOT PL4C3')).toBe(-1);
	});
});

describe('Testing App HandleInput', () => {
	const spy = jest.spyOn(console, 'log').mockImplementation();
	/**
	 * Without this, they will fail...
	 */
	beforeEach(() => {
		// Need to setup the program first before testing.
		handleInput('PLACE 0,0,NORTH');
	});

	it('should fail when provided an invalid command', () => {
		handleInput('FAKE');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenLastCalledWith(
			chalk.bgRed(`Please use a valid command.`)
		);
	});

	it('should execute PLACE without any exceptions', () => {
		expect(handleInput('PLACE 0,0,NORTH')).toEqual({
			command: 'PLACE',
			_Map: [
				[1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			],
		});
	});

	it('should execute MOVE without any exceptions', () => {
		// Turning the robot for this test... so we can actually test it.
		handleInput('RIGHT');
		handleInput('RIGHT');
		expect(handleInput('MOVE')).toEqual({
			command: 'MOVE',
			_Map: [
				[0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			],
		});
	});

	it('should execute LEFT without any exceptions', () => {
		expect(handleInput('LEFT')).toEqual({
			command: 'LEFT',
			currentDirection: 'WEST',
		});
	});

	it('should execute RIGHT without any exceptions', () => {
		expect(handleInput('RIGHT')).toEqual({
			command: 'RIGHT',
			currentDirection: 'EAST',
		});
	});

	it('should execute REPORT without any exceptions', () => {
		expect(handleInput('REPORT')).toBe(1);
	});

	afterAll(() => {
		spy.mockRestore();
	});
});
