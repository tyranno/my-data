//게임한 데이터 축적...
const numGame = [
	{
		date: '2023-05-20',
		nums: [
			[2, 21, 26, 32, 34, 36],
			[2, 23, 26, 32, 36, 44],
			[3, 6, 14, 18, 26, 35]
		]
	},
	{
		date: '2023-05-13',
		nums: [
			[2, 21, 26, 32, 36, 44],
			[2, 26, 32, 36, 42, 44],
			[3, 12, 14, 22, 26, 45]
		]
	},
	{
		date: '2023-05-06',
		nums: [
			[21, 26, 29, 32, 36, 42],
			[16, 21, 26, 29, 34, 36],
			[3, 12, 22, 29, 35, 45]
		],
		result: [[21, 32], [16, 21], []]
	},
	{
		date: '2023-04-29',
		nums: [
			[24, 26, 29, 36, 42, 44],
			[16, 21, 26, 34, 42, 44],
			[6, 12, 13, 29, 37, 45]
		],
		result: [[], [], [45]]
	},
	{
		date: '2023-04-15',
		nums: [
			[3, 16, 24, 26, 34, 36],
			[3, 16, 21, 26, 34, 36],
			[6, 12, 26, 29, 37, 45]
		],
		result: [[3], [3], [6]]
	},
	{
		date: '2023-04-08',
		nums: [
			[8, 10, 26, 29, 34, 40],
			[1, 6, 7, 16, 19, 25],
			[8, 10, 19, 30, 40, 43]
		],
		result: [[], [6], []]
	},
	{
		date: '2023-04-01',
		nums: [
			[7, 13, 15, 20, 24, 26],
			[11, 29, 32, 35, 37, 40],
			[2, 9, 14, 34, 40, 42]
		],
		result: [[20], [32, 40], [40]]
	},
	{
		date: '2023-03-25',
		nums: [
			[5, 9, 11, 13, 15, 40],
			[1, 4, 14, 31, 36, 43],
			[18, 20, 24, 26, 31, 37]
		],
		result: [[], [], [24, 37]]
	},
	{
		date: '2023-03-18',
		nums: [
			[4, 21, 30, 31, 38, 42],
			[3, 14, 23, 33, 37, 43],
			[2, 18, 23, 33, 43, 39],
			[8, 17, 19, 29, 32, 37]
		],
		result: [[38], [3, 33], [33], []]
	}
];

export default numGame;
