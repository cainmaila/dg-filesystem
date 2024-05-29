<script lang="ts">
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

<main class="container">
	{#if ready}
		<slot />
	{:else}
		<div>Loading..</div>
	{/if}
</main>
