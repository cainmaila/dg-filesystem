<script lang="ts">
	import { createDrive, getDrives } from '$lib/sdk'
	import { me$ } from '$lib/utils'

	let drives: I_Drives //自己的Drive List

	startGetDrives()
	async function startGetDrives() {
		const { data } = await getDrives()
		drives = data
	}

	async function addDrive() {
		const name = (document.getElementById('drivename') as HTMLInputElement).value
		try {
			if (!name) throw new Error('請輸入Drive名稱')
			await createDrive({
				name,
				metadata: {}
			})
			await startGetDrives()
		} catch (error) {
			console.log(error)
		}
	}
</script>

<h1>檔案系統</h1>
<div>{$me$?.userName}</div>
<!-- <pre>{JSON.stringify(drives, null, 2)}</pre> -->
<section>
	<input type="text" placeholder="Drive 名稱" id="drivename" />
	<button on:click={addDrive}>新增Drive</button>
</section>

<div>
	{#each drives?.drives || [] as drive}
		<div>
			<div>
				<a href={`/drive/${drive._id}`}>{drive.name || drive._id}</a>
			</div>
		</div>
	{/each}
</div>
