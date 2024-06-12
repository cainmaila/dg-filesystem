<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { getUserMeApi, loginApi } from '$lib/sdk/index.js'
	import Cookies from 'js-cookie'
	let accessToken = ''

	export let data
	const { INVENTEC_SERVICE_URL } = data

	let account: string
	let password: string
	let userMe: any
	let errorMesssage: string
	let loading = false

	onMount(() => {
		accessToken = Cookies.get('accessToken') || '' // 取得accessToken
	})

	// 保存accessToken
	function handleAccessToken() {
		accessToken && Cookies.set('accessToken', accessToken)
		goto('/', { replaceState: true })
	}

	// 驗證有效性
	async function getUserMe() {
		try {
			loading = true
			restUi()
			Cookies.set('accessToken', accessToken)
			await new Promise((resolve) => setTimeout(resolve, 100))
			const { data } = await getUserMeApi()
			userMe = data
		} catch (error) {
			// console.warn(error)
			//@ts-ignore
			errorMesssage = error?.message || ''
		} finally {
			loading = false
		}
	}

	// 重置UI
	function restUi() {
		userMe = null
		errorMesssage = ''
	}

	async function onLoginSumit(event: Event) {
		event.preventDefault()
		errorMesssage = ''
		try {
			const { data } = await loginApi({ account, password })
			const { accessToken: _accessToken } = data
			Cookies.set('accessToken', _accessToken)
			accessToken = _accessToken
		} catch (error: any) {
			console.log(error)
			errorMesssage = error?.message || ''
		}
	}
</script>

<section>
	<h2 class="h2">服務器位置</h2>
	<code class="code">{INVENTEC_SERVICE_URL}</code>
</section>
<section class="card p-4">
	<form on:submit={onLoginSumit}>
		<div class="grid grid-cols-3 gap-2">
			<label class="label">
				<input class="input" type="text" name="account" bind:value={account} placeholder="帳號" />
			</label>
			<label class="label">
				<input class="input" type="text" name="password" bind:value={password} placeholder="密碼" />
			</label>
			<button class="variant-filled btn" type="submit">登入</button>
		</div>
	</form>
</section>
<section class="card grid gap-2 p-4">
	<label class="label">
		<input class="input" type="text" bind:value={accessToken} placeholder="請餵養 accessToken" />
	</label>
	<button class="variant-filled btn" on:click={handleAccessToken}>Save</button>
</section>
<section class="grid gap-2">
	<h2 class="h2">驗證有效性</h2>
	<button class="variant-filled btn" on:click={getUserMe}>取得使用者資訊</button>
	{#if loading}
		<div class="w-full text-center">
			<div class="loader"></div>
		</div>
	{:else if errorMesssage}
		<p>{errorMesssage}</p>
	{:else if userMe}
		<pre class="pre">{JSON.stringify(userMe, null, 2)}</pre>
	{/if}
</section>
