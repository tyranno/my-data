import NumWin from './data/data.js';
import NumGame from './data/game.js';

class CLottery {
	constructor() {
		this.mapSortFreq = new Map();
		this.map최근100회빈도 = new Map();
	}

	getGameDate = () => {
		const array최근100게임일 = [];
		NumWin.slice(0, 100).forEach((e) => {
			array최근100게임일.push(e.date);
		});
		return array최근100게임일;
	};

	// 빈도 분석
	frequency = (date) => {
		const mapFreq = new Map();
		const mapFreq100 = new Map();
		let free100Cnt = 0;

		NumWin.forEach((e) => {
			if (date && e.date > date) return;
			free100Cnt++;

			e.nums.forEach((d) => {
				mapFreq.set(d, (mapFreq.get(d) || 0) + 1);
				if (free100Cnt < 100) {
					mapFreq100.set(d, (mapFreq100.get(d) || 0) + 1);
				}
			});
		});

		this.mapSortFreq = new Map([...mapFreq.entries()].sort((a, b) => b[1] - a[1]));
		this.map최근100회빈도 = new Map([...mapFreq100.entries()].sort((a, b) => b[1] - a[1]));

		return {
			'전체 빈도': this.mapSortFreq,
			'최근100 빈도': this.map최근100회빈도
		};
	};

	// 최근 게임에 대한 빈도 분석
	lastGameFreq = (date) => {
		const lastFreq = new Map();
		const lastFreq100 = new Map();

		let lastWinGame = null;
		if (!date) {
			lastWinGame = NumWin[0];
		} else {
			lastWinGame = NumWin.find((e) => e.date === date) || NumWin[0];
		}

		if (lastWinGame) {
			for (let num of lastWinGame.nums) {
				num = Number(num);
				lastFreq.set(num, this.mapSortFreq.get(num));
				lastFreq100.set(num, this.map최근100회빈도.get(num));
			}
		}

		return {
			'전체 게임에서 최근게임의 빈도': lastFreq,
			'최근100번 게임에서 최근게임의 빈도': lastFreq100
		};
	};

	// 마지막 게임한 데이터
	getLastGame = (date) => {
		console.log(date);
		for (let i = 0; i < NumGame.length; i++) {
			if (NumGame[i].date === date) {
				console.log(NumGame[i].date);
				return NumGame[i].nums;
			}
		}
		return [];
	};
}

const lottery = new CLottery();
export default lottery;
