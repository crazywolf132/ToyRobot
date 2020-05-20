import * as map from '../utils/map';

let _Generated;
let _Control = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];

describe('Testing Map Functions', () => {
	it('should generate a 5x5 2d Map', () => {
		_Generated = map.generateMap();
		expect(_Generated).toEqual(_Control);
	});

	it('should place a robot at 2, 2', () => {
		_Generated = map.placeRobot(_Generated, 2, 2);
		_Control[2][2] = 1;
		expect(_Generated).toEqual(_Control);
	});

	it('should return a position of {x: 2, y: 2}', () => {
		expect(map.getPosition(_Generated)).toEqual({ x: 2, y: 2 });
	});

	it('should generate new Cordinates of {x: 2, y: 3}', () => {
		expect(
			map.generateNewCoordinates(map.getPosition(_Generated), 'EAST')
		).toEqual({ x: 2, y: 3 });
	});

	it('should generate correct new NORTH coordinates starting at 1,1', () => {
		expect(map.generateNewCoordinates({ x: 1, y: 1 }, 'NORTH')).toEqual({
			x: 0,
			y: 1,
		});
	});

	it('should generate correct new EAST coordinates starting at 1,1', () => {
		expect(map.generateNewCoordinates({ x: 1, y: 1 }, 'EAST')).toEqual({
			x: 1,
			y: 2,
		});
	});

	it('should generate correct new SOUTH coordinates starting at 1,1', () => {
		expect(map.generateNewCoordinates({ x: 1, y: 1 }, 'SOUTH')).toEqual({
			x: 2,
			y: 1,
		});
	});

	it('should generate correct new WEST coordinates starting at 1,1', () => {
		expect(map.generateNewCoordinates({ x: 1, y: 1 }, 'WEST')).toEqual({
			x: 1,
			y: 0,
		});
	});

	it('should move the robot 1 to the left whilst facing EAST', () => {
		// Manually removing the old location, and adding the new one.
		_Control[2][2] = 0;
		_Control[2][3] = 1;
		expect(map.moveRobot(_Generated, 'EAST')).toEqual(_Control);
	});

	it('should return false for invalid coordinates', () => {
		expect(map.validMove({ x: 10, y: 10 })).toBe(false);
	});

	it('should return -1 when placing robot in -1, -1', () => {
		expect(map.placeRobot(_Generated, -1, -1)).toBe(-1);
	});

	it('should return -1 when generating new Coordinates for direction : "FAIL"', () => {
		expect(
			map.generateNewCoordinates(map.getPosition(_Generated), 'FAIL')
		).toBe(-1);
	});

	it('should return original map if it fails to move robot', () => {
		_Control[2][3] = 0;
		_Control[0][0] = 1;
		// We are using the control for this one... as it is easier.
		expect(map.moveRobot(_Control, 'NORTH')).toEqual(_Control);
	});
});
