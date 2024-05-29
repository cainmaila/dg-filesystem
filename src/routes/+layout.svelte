<script lang="ts">
	import { onMount } from 'svelte'
	import axios from 'axios'
	import { axiosInterceptors } from '$lib/utils/index.js'

	export let data
	const { INVENTEC_SERVICE_URL } = data
	axios.defaults.baseURL = INVENTEC_SERVICE_URL

	onMount(() => {
		const interceptor = axiosInterceptors() // 添加Axios攔截器
		return () => {
			interceptor()
		}
	})
</script>

<slot />
