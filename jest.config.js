module.exports = {
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/coverage/**',
		'!**/jest.config.js',
	],
	testEnvironment: 'node',
};
