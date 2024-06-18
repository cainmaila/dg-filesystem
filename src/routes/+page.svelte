<script lang="ts">
	import { goto } from '$app/navigation'
	import { getDrives } from '$lib/sdk'
	import { me$ } from '$lib/utils'
	import { onMount } from 'svelte'
	import { Avatar } from '@skeletonlabs/skeleton'

	let drives: I_Drives //自己的Drive List

	onMount(() => {
		// startGetDrives()
	})
	async function startGetDrives() {
		try {
			const { data } = await getDrives()
			drives = data
		} catch (error) {
			//@ts-ignore
			console.error(error.message)
			goto('/login')
		}
	}
</script>

<div class="flex items-center gap-x-4">
	<h1 class="h1 flex-none">檔案系統</h1>
	<Avatar initials={$me$?.userName} background="bg-primary-500" />
</div>
<!-- <pre class="pre">{JSON.stringify(drives, null, 2)}</pre> -->
{#await getDrives()}
	<div class="loader"></div>
{:then { data }}
	<div class="card">
		<nav class="list-nav">
			<ul>
				{#each data.drives || [] as drive (drive._id)}
					<ui>
						<a href={`/drive/${drive._id}/${drive.root}`}>💾 {drive.name || drive._id}</a>
					</ui>
				{/each}
			</ul>
		</nav>
	</div>
{:catch error}
	<aside class="alert variant-ghost">
		<div class="alert-message">
			<p>{error.message}</p>
		</div>
	</aside>
	<button type="button" class="variant-filled btn" on:click={() => goto('/login')}>登入頁</button>
{/await}
