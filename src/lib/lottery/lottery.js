import NumWin from './data/data.js';
import NumGame from './data/game.js';

let mapSortFreq = new Map();
let map최근100회빈도 = new Map();

//빈도 분석
function frequency() {
	let mapFreq = new Map();
	NumWin.map((e) => {
		e.map((d) => {
			if (mapFreq.has(d)) {
				mapFreq.set(d, mapFreq.get(d) + 1);
			} else {
				mapFreq.set(d, 1);
			}
		});
	});
	mapSortFreq = new Map([...mapFreq].sort((a, b) => b[1] - a[1]));

	mapFreq.clear();
	NumWin.slice(0, 100).map((e) => {
		e.map((d) => {
			if (mapFreq.has(d)) {
				mapFreq.set(d, mapFreq.get(d) + 1);
			} else {
				mapFreq.set(d, 1);
			}
		});
	});

	map최근100회빈도 = new Map([...mapFreq].sort((a, b) => b[1] - a[1]));

	return {
		'전체 빈도': mapSortFreq,
		'최근100 빈도': map최근100회빈도
	};
}

//최근 게임에대한 빈도 분석
function lastGameFreq() {
	let lastGameWin = NumWin[0];

	let lastFreq = new Map();
	let lastFreq100 = new Map();
	for (let num of lastGameWin) {
		num = num * 1;
		lastFreq.set(num, mapSortFreq.get(num));
		lastFreq100.set(num, map최근100회빈도.get(num));
	}
	return {
		'전체 게임에서 최근게임의 빈도': lastFreq,
		'최근100번 게임에서 최근게임의 빈도': lastFreq100
	};
}

export default {
	frequency,
	lastGameFreq
};
