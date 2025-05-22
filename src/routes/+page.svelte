<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Tyranno's Data</title>
	<meta name="description" content="tyranno's data page" />
</svelte:head>

<section>
	<h1>Hi</h1>
	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>