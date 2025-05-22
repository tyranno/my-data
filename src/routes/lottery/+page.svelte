<script>
	import { onMount } from 'svelte';
	import Lottery from '$lib/lottery/lottery';

	const gameDate = Lottery.getGameDate();
	$: gameFreq = Lottery.frequency(gameDate[0]);
	$: lastWinFreq = Lottery.lastGameFreq(gameDate[0]);
	$: arr전체빈도 = Array.from(gameFreq['전체 빈도']);
	$: arr최근100빈도 = Array.from(gameFreq['최근100 빈도']);
	$: lastGameNum = Lottery.getLastGame(gameDate[0]);

	let lastGameNumIdx = 0;
	let str맞춘번호 = '';

	function dateChanged(event) {
		const value = event.target.value;
		gameFreq = Lottery.frequency(value);
		lastWinFreq = Lottery.lastGameFreq(value);
	}

	function calGameResult(value, str당첨번호들) {
		const valNums = value.split(',');
		const winNums = str당첨번호들.split(',');
		let strResult = '';
		valNums.forEach((v) => {
			if (winNums.includes(v)) {
				strResult += `${v} `;
			}
		});
		str맞춘번호 = strResult.length === 0 ? '없음' : strResult;
	}

	function dateChangedGame(event) {
		lastGameNum = Lottery.getLastGame(event.target.value);
	}

	function dateChangedGameNum(event) {
		const value = event.target.value;
		const strWinNums = [...lastWinFreq['전체 게임에서 최근게임의 빈도'].keys()].join(',');
		calGameResult(value, strWinNums);
		lastGameNumIdx = event.target.selectedIndex;
		gameFreq = Lottery.frequency(gameDate[0]);
	}

	export const getMatchClass = (num) => {
		let retVal = '';
		if (lastWinFreq['전체 게임에서 최근게임의 빈도'].has(num)) {
			retVal = 'bg-yellow-300';
		}
		if (
			lastGameNum[lastGameNumIdx] &&
			lastGameNum[lastGameNumIdx].includes(num)
		) {
			retVal += ' bg-green-400';
		}
		return retVal;
	};

	onMount(() => {
		calGameResult(lastGameNum[0].join(', '), gameDate[0]);
	});
</script>

<svelte:head>
	<title>로또게임</title>
	<meta name="description" content="로또게임" />
</svelte:head>

<div class="max-w-[1400px] ml-10">
	<div class="flex flex-row justify-center pb-6 text-center">
		<span>게임일:</span>
		<select on:change={dateChanged} class="ml-2 border px-2 py-1">
			{#each gameDate as value}
				<option {value}>{value}</option>
			{/each}
		</select>
		<div class="ml-5">
			당첨번호:
			{#each [...lastWinFreq['전체 게임에서 최근게임의 빈도']] as [key]}
				{`${key} `}
			{/each}
		</div>
	</div>

	<div class="flex flex-row justify-around gap-6">
		<!-- 빈도 분석 테이블 -->
		<div class="overflow-x-auto w-1/3">
			<table class="table-auto border border-black w-full text-center">
				<caption class="font-bold mb-2">게임 빈도 분석</caption>
				<thead class="bg-blue-900 text-white">
					<tr>
						<th>번호</th>
						<th>전체</th>
						<th>최근100회</th>
					</tr>
				</thead>
				<tbody>
					{#each [...lastWinFreq['전체 게임에서 최근게임의 빈도']] as [key, value]}
						<tr class="even:bg-blue-100 odd:bg-blue-50">
							<td>{key}</td>
							<td>{value}</td>
							<td>{lastWinFreq['최근100번 게임에서 최근게임의 빈도'].get(key)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- 분석 조작 패널 -->
		<div class="w-1/4 space-y-3">
			<div class="font-semibold">게임 분석</div>

			<div class="flex items-center space-x-2">
				<span>게임일:</span>
				<select on:change={dateChangedGame} class="border px-2 py-1">
					{#each gameDate as value}
						<option {value}>{value}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-center space-x-2">
				<span>번호:</span>
				<select on:change={dateChangedGameNum} class="border px-2 py-1">
					{#each lastGameNum as item}
						<option value={item}>{item.join(', ')}</option>
					{/each}
				</select>
			</div>

			<div>
				<p class="font-semibold">맞춘 번호:</p>
				<p class="pl-2">{str맞춘번호}</p>
			</div>
		</div>

		<!-- 전체 빈도 테이블 -->
		<div class="overflow-x-auto w-1/3">
			<table class="table-auto border border-black w-full text-center">
				<caption class="font-bold mb-2">전체 빈도의 횟수</caption>
				<thead class="bg-blue-900 text-white">
					<tr>
						<th colspan="2">전체</th>
						<th colspan="2">최근100회</th>
					</tr>
					<tr>
						<th>번호</th>
						<th>발생</th>
						<th>번호</th>
						<th>발생</th>
					</tr>
				</thead>
				<tbody>
					{#each arr전체빈도 as [key, value], index}
						<tr class="even:bg-blue-100 odd:bg-blue-50">
							<td class={getMatchClass(key)}>{key}</td>
							<td class={getMatchClass(key)}>{value}</td>
							<td class={getMatchClass(arr최근100빈도[index][0])}>{arr최근100빈도[index][0]}</td>
							<td class={getMatchClass(arr최근100빈도[index][0])}>{arr최근100빈도[index][1]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
