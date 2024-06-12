<script>
	import '../app.css'
	import { onMount } from 'svelte'
	import { axiosInterceptors } from '$lib/utils'

	let ready = false
	onMount(() => {
		const interceptor = axiosInterceptors() // 添加Axios攔截器
		ready = true
		return () => {
			interceptor()
		}
	})
</script>

<main class="container mx-auto space-y-8 p-8">
	{#if ready}
		<slot></slot>
	{:else}
		<div>Loading..</div>
	{/if}
</main>

<style>
	:root {
		--pico-line-height: 1;
	}
	:global(button) {
		/* height: 40px; */
	}
</style>
