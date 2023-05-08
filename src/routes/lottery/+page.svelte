<script lang="ts">
	import Lottery from '../../lib/lottery/lottery';

	const gameDate = Lottery.getGameDate();
	$: gameFreq = Lottery.frequency(gameDate[0]);
	$: lastWinFreq = Lottery.lastGameFreq(gameDate[0]);
	$: arr전체빈도 = Array.from(gameFreq['전체 빈도']);
	$: arr최근100빈도 = Array.from(gameFreq['최근100 빈도']);

	function isMatchNum(num: number) {
		return lastWinFreq['전체 게임에서 최근게임의 빈도'].has(num);
	}

	function dateChanged(event: Event) {
		const target = event.target as HTMLSelectElement;
		gameFreq = Lottery.frequency(target.value);
		lastWinFreq = Lottery.lastGameFreq(target.value);
	}
</script>

<svelte:head>
	<title>로또게임</title>
	<meta name="description" content="로또게임" />
</svelte:head>

<div class="container">
	<div class="gamedate">
		게임일 :
		<select on:change={dateChanged} style="margin-left: 10px;">
			{#each gameDate as value}
				<option {value}>
					{value}
				</option>
			{/each}
		</select>
		<div style="margin-left: 20px;">
			당첨번호:
			{#each [...lastWinFreq['전체 게임에서 최근게임의 빈도']] as [key]}
				{`${key} `}
			{/each}
		</div>
	</div>
	<div class="freq-table">
		<div>
			<table>
				<caption>게임 빈도 분석</caption>
				<thead>
					<tr>
						<th>번호</th>
						<th>전체 </th>
						<th>최근100회 </th>
					</tr>
				</thead>
				<tbody>
					{#each [...lastWinFreq['전체 게임에서 최근게임의 빈도']] as [key, value]}
						<tr>
							<td>{key}</td>
							<td>{value} </td>
							<td>{lastWinFreq['최근100번 게임에서 최근게임의 빈도'].get(key)} </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div>
			<table>
				<caption>전체 빈도의 횟수</caption>
				<thead>
					<tr>
						<th colspan="2">전체</th>
						<th colspan="2">최근100회</th>
					</tr>
					<tr>
						<th>번호</th>
						<th>발생건수</th>
						<th>번호</th>
						<th>발생건수</th>
					</tr>
				</thead>
				<tbody>
					{#each arr전체빈도 as [key, value], index}
						<tr>
							<td class={isMatchNum(key) ? 'match-num' : ''}>{key}</td>
							<td class={isMatchNum(key) ? 'match-num' : ''}>{value} </td>
							<td class={isMatchNum(arr최근100빈도[index][0]) ? 'match-num' : ''}
								>{arr최근100빈도[index][0]}</td
							>
							<td class={isMatchNum(arr최근100빈도[index][0]) ? 'match-num' : ''}
								>{arr최근100빈도[index][1]}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1400px;
		margin: 0px 0 0 2.5rem;
	}
	.freq-table {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	table {
		width: 100%;
		border-top: 1px solid #444444;
		border-collapse: collapse;
	}
	th,
	td {
		border-bottom: 1px solid #444444;
		padding: 5px;
		text-align: center;
	}
	thead tr {
		background-color: #0d47a1;
		color: #ffffff;
	}
	tbody tr:nth-child(2n) {
		background-color: #bbdefb;
	}
	tbody tr:nth-child(2n + 1) {
		background-color: #e3f2fd;
	}
	.match-num {
		background-color: yellow !important;
	}
	.gamedate {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 5px;
		text-align: center;
		padding-bottom: 25px;
	}
</style>
