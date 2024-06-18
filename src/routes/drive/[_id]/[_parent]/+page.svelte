<script lang="ts">
	import { createFolder, getBlobs, uploadFile } from '$lib/sdk'

	export let data
	const { _id, parent } = data

	//取的網址上query string的name
	const urlParams = new URLSearchParams(location.search)
	const name = urlParams.get('name')

	let loading = false
	let fileTyle = 1
	let blobs: I_Blob[] = []

	async function fetchBlobs() {
		loading = true
		try {
			const res = await getBlobs({ drive: _id, parent })
			blobs = res.data.blobs
		} catch (error: any) {
			alert(error.message)
		} finally {
			loading = false
		}
	}

	//@ts-ignore
	async function onCreateBlob(e) {
		e.preventDefault()
		loading = true
		const name = e.target.name.value
		switch (fileTyle) {
			case 1:
				try {
					await createFolder({
						parent,
						name
					})
				} catch (error: any) {
					alert(error.message)
				}
				break
			case 2:
				const data = new FormData()
				console.log(e.target.file)
				data.append('file', e.target.file.files[0])
				data.append('name', name)
				data.append('parent', parent)
				try {
					await uploadFile(data)
				} catch (error: any) {
					alert(error.message)
				}
				break
		}

		try {
			await fetchBlobs()
		} catch (error: any) {
			alert(error.message)
		} finally {
			loading = false
		}
	}

	function gotoPage(parentId: string, name: string = '') {
		// goto(`/drive/${_id}/${parentId}`)
		location.href = `/drive/${_id}/${parentId}${name && '?name=' + name}`
	}

	function changeFileType(e: any) {
		fileTyle = (e.target as HTMLInputElement).id === 'folder' ? 1 : 2
	}
</script>

<h1 class="h1">{name || 'Drive'}</h1>
<form on:submit={onCreateBlob} class="card grid gap-4 p-4">
	<fieldset class="flex gap-4">
		<label class="label" for="folder"
			><input
				class="radio mr-2"
				type="radio"
				id="folder"
				name="second-language"
				on:change={changeFileType}
				checked
			/>資料夾</label
		>
		<label class="label" for="fileType"
			><input
				class="radio mr-2"
				type="radio"
				id="fileType"
				name="second-language"
				on:change={changeFileType}
			/>檔案</label
		>
	</fieldset>
	<input class="input" type="text" name="name" placeholder="Name" />
	{#if fileTyle !== 1}
		<input type="file" name="file" placeholder="File" />
	{/if}
	<button class="variant-filled btn" type="submit">POST</button>
</form>

<!-- <pre>{JSON.stringify(blobs, null, 2)}</pre> -->
{#await fetchBlobs()}
	<div class="loader"></div>
{:then}
	{#each blobs || [] as blob}
		<div>
			{#if blob.type === 1}
				<span> 📁 </span>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href="#"
					on:click={() => {
						gotoPage(blob._id, blob.name)
					}}>{blob.name}</a
				>
			{:else}
				<span> 📄 </span>
				<span>{blob.name}</span>
			{/if}
		</div>
	{/each}
{:catch error}
	<div>{error.message}</div>
{/await}
