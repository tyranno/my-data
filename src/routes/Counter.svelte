<script>
	import { Spring } from 'svelte/motion';

	const count = new Spring(0);
    const offset = $derived(modulo(count.current, 1));

	/**
	 * @param {number} n
	 * @param {number} m
	 */
	function modulo(n, m) {
		return ((n % m) + m) % m;
	}
</script>

<div class="flex border-y border-black/10 my-4">
	<button
        onclick={() => (count.target -= 1)} 
        aria-label="Decrease the counter by one"
		class="w-8 p-0 flex items-center justify-center border-0 bg-transparent text-2xl hover:bg-gray-100"
	>
		<svg aria-hidden="true" viewBox="0 0 1 1" class="w-1/4 h-1/4">
			<path d="M0,0.5 L1,0.5" stroke="#444" stroke-width="2" vector-effect="non-scaling-stroke" />
		</svg>
	</button>

	<div class="w-32 h-16 overflow-hidden text-center relative">
		<div
			class="absolute w-full h-full"
			style="transform: translateY({100 * offset}%); transition: transform 0.2s;"
		>
			<strong
				class="absolute w-full h-full flex items-center justify-center text-4xl font-normal text-blue-700 -top-full select-none"
				aria-hidden="true"
			>
				{Math.floor(count.current + 1)}
			</strong>
			<strong class="absolute w-full h-full flex items-center justify-center text-4xl font-normal text-blue-700">
				{Math.floor(count.current)}
			</strong>
		</div>
	</div>

	<button
        onclick={() => (count.target += 1)}
		aria-label="Increase the counter by one"
		class="w-8 p-0 flex items-center justify-center border-0 bg-transparent text-2xl hover:bg-gray-100"
	>
		<svg aria-hidden="true" viewBox="0 0 1 1" class="w-1/4 h-1/4">
			<path
				d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"
				stroke="#444"
				stroke-width="2"
				vector-effect="non-scaling-stroke"
			/>
		</svg>
	</button>
</div>
