import * as commands from '../utils/commands';
import { generateMap } from '../utils/map';

const spy = jest.spyOn(console, 'log').mockImplementation();

let _Generated = generateMap();
let _Control = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];
const _Directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

describe('Testing Commands', () => {
	it('should PLACE the robot on the map', () => {
		_Control[1][1] = 1;
		expect(
			commands.PLACE(_Generated, _Directions, 'NORTH', 'PLACE 1,1,WEST')
		).toEqual({ map: _Control, currentDirection: 'WEST' });
	});
	it('should fail the PLACE command due to lack of arguments', () => {
		expect(commands.PLACE(_Generated, _Directions, 'NORTH', 'PLACE')).toBe(
			-1
		);
	});
	it('should fail the PLACE command due to lack of location information', () => {
		expect(
			commands.PLACE(_Generated, _Directions, 'NORTH', 'PLACE 1,1')
		).toBe(-1);
	});
	it('should fail the PLACE command due to incorrect direction', () => {
		expect(
			commands.PLACE(_Generated, _Directions, 'NORTH', 'PLACE 1,1,NO')
		).toBe(-1);
	});
	it('should fail the PLACE command due to incorrect location', () => {
		expect(
			commands.PLACE(
				_Generated,
				_Directions,
				'NORTH',
				'PLACE 12,12,NORTH'
			)
		).toBe(-1);
	});
	it('should MOVE the robot according to the direction', () => {
		_Control[1][1] = 0;
		_Control[1][2] = 1;
		expect(commands.MOVE(_Generated, 'EAST')).toEqual(_Control);
	});
	it('should move LEFT through Directions list from SOUTH', () => {
		expect(commands.LEFT('SOUTH', _Directions)).toBe('EAST');
		expect(commands.LEFT('NORTH', _Directions)).toBe('WEST');
	});
	it('should move RIGHT through directions list from SOUTH', () => {
		expect(commands.RIGHT('SOUTH', _Directions)).toBe('WEST');
		expect(commands.RIGHT('WEST', _Directions)).toBe('NORTH');
	});
	it('should REPORT the current postion of the robot', () => {
		commands.REPORT(_Control, 'NORTH');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenLastCalledWith(`Output: 1,2,NORTH`);
	});
});

afterAll(() => {
	spy.mockRestore();
});
