<script>
	/**
	 * @type {any}
	 */
	export let block;
	let domain = '@naver.com'; // 부모에서 domain를 부르면 @naver.com이 담긴다
	console.log($$slots); // {name: true, age: true, email: true}
</script>

<!-- 범위 슬록, $$slots -->
<button class:block>
	<slot name="name">default btn</slot>
	<hr />
	<slot name="age">1</slot>
	{#if $$slots.email}
		<hr />
		<slot name="email" {domain} alsoSlot="alsoSlot">zz{domain}</slot>
	{/if}
</button>

<style>
	.block {
		display: block;
	}
</style>
