<script lang="ts">
	import { onMount } from 'svelte'
	import { axiosInterceptors } from '$lib/utils'

	onMount(() => {
		const interceptor = axiosInterceptors() // 添加Axios攔截器
		return () => {
			interceptor()
		}
	})
</script>

<slot />
