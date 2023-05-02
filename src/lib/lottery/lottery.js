import NumWin from './data/data.js';
import NumGame from './data/game.js';

class CLottery {
	constructor() {
		this.mapSortFreq = new Map();
		this.map최근100회빈도 = new Map();
	}

	/**
	 * @returns {string[]}
	 *
	 */
	getGameDate = () => {
		/**
		 * @type {string[]}
		 */
		let array최근100게임일 = [];
		NumWin.slice(0, 100).map((e) => {
			array최근100게임일.push(e.date);
		});
		return array최근100게임일;
	};

	//빈도 분석
	/**
	 * @param {string} [date] - 날짜 선택
	 * @returns {{
	 *            '전체 빈도': Map<number, number>,
	 * 						'최근100 빈도': Map<number, number>}} - 번호(1~45)/빈도
	 */
	frequency = (date) => {
		let mapFreq = new Map();
		let mapFreq100 = new Map();
		let free100Cnt = 0;

		NumWin.map((e) => {
			if (date && e.date > date) return;
			free100Cnt++;

			e.nums.map((d) => {
				if (mapFreq.has(d)) {
					mapFreq.set(d, mapFreq.get(d) + 1);
				} else {
					mapFreq.set(d, 1);
				}
				if (free100Cnt < 100) {
					if (mapFreq100.has(d)) {
						mapFreq100.set(d, mapFreq100.get(d) + 1);
					} else {
						mapFreq100.set(d, 1);
					}
				}
			});
		});
		this.mapSortFreq = new Map([...mapFreq].sort((a, b) => b[1] - a[1]));
		this.map최근100회빈도 = new Map([...mapFreq100].sort((a, b) => b[1] - a[1]));

		return {
			'전체 빈도': this.mapSortFreq,
			'최근100 빈도': this.map최근100회빈도
		};
	};

	//최근 게임에대한 빈도 분석
	/**
	 * @param {string} [date] - 날짜 선택
	 * @returns {{'전체 게임에서 최근게임의 빈도': Map<number, number>,
	 *					'최근100번 게임에서 최근게임의 빈도': Map<number, number>}} - 번호(당첨번호)/빈도
	 */
	lastGameFreq = (date) => {
		let lastFreq = new Map();
		let lastFreq100 = new Map();

		let lastWinGame = null;
		if (!date) {
			lastWinGame = NumWin[0];
		} else {
			lastWinGame = NumWin.find((e) => e.date === date);
			if (!lastWinGame) {
				lastWinGame = NumWin[0];
			}
		}

		if (lastWinGame) {
			for (let num of lastWinGame.nums) {
				num = num * 1;
				lastFreq.set(num, this.mapSortFreq.get(num));
				lastFreq100.set(num, this.map최근100회빈도.get(num));
			}
		}

		return {
			'전체 게임에서 최근게임의 빈도': lastFreq,
			'최근100번 게임에서 최근게임의 빈도': lastFreq100
		};
	};
}

const lottery = new CLottery();
export default lottery;
