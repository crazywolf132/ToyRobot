export const generateMap = () => {
	let startingMap = [];
	startingMap.length = 5;

	startingMap.forEach((row) => {
		row = [];
		row.length = 5;
		return row;
	});
	return startingMap;
};
