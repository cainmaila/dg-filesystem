<script lang="ts">
	import { goto } from '$app/navigation'
	import { getDrives } from '$lib/sdk'
	import { me$ } from '$lib/utils'

	let drives: I_Drives //自己的Drive List

	startGetDrives()
	async function startGetDrives() {
		try {
			const { data } = await getDrives()
			drives = data
		} catch (error) {
			//@ts-ignore
			alert(error.message || '發生錯誤')
			goto('/login')
		}
	}
</script>

<h1>檔案系統</h1>
<div>{$me$?.userName}</div>
<!-- <pre>{JSON.stringify(drives, null, 2)}</pre> -->
<div>
	{#each drives?.drives || [] as drive (drive._id)}
		<div>
			<div>
				<a href={`/drive/${drive._id}`}>{drive.name || drive._id}</a>
			</div>
		</div>
	{/each}
</div>
