<script lang="ts">
	import { createFolder, deleteBlob, getBlobs, uploadFile } from '$lib/sdk'
	import ContextMenu, { Item } from 'svelte-contextmenu'

	export let data
	const { _id, parent } = data

	//取的網址上query string的name
	const urlParams = new URLSearchParams(location.search)
	const name = urlParams.get('name')
	let myMenu: ContextMenu
	let loading = false
	let fileTyle = 1
	let blobs: I_Blob[] = []
	let blobsViewData: {
		folders: I_Blob[]
		files: I_Blob[]
	}
	let contextMenuTargetId: string
	//分類 type 1: 資料夾 2: 檔案，變成兩個陣列
	$: blobsViewData = classifyBlobs(blobs)

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
				data.append('file', e.target.file.files[0])
				data.append('thumbnail', e.target.file.files[0])
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
			fetchBlobs()
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

	//分類 type 1: 資料夾 2: 檔案，變成兩個陣列
	function classifyBlobs(blobs: I_Blob[]) {
		const folders = blobs.filter((blob) => blob.type === 1)
		const files = blobs.filter((blob) => blob.type === 2)
		return { folders, files }
	}

	async function contextMenuDel() {
		try {
			await deleteBlob(contextMenuTargetId)
		} catch (error: any) {
			alert(error.message)
		}
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
	{#each blobsViewData.folders as folder (folder._id)}
		<div>
			<span> 📁 </span>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				href="#"
				on:click={() => {
					gotoPage(folder._id, folder.name)
				}}>{folder.name}</a
			>
		</div>
	{/each}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#each blobsViewData.files as file (file._id)}
		<div
			on:contextmenu={(e) => {
				contextMenuTargetId = file._id
				myMenu.show(e)
			}}
		>
			<span> 📄 </span>
			{#if file?.thumbnail}
				<img src={file.thumbnail} alt="" />
			{/if}
			<span>{file.name}</span>
		</div>
	{/each}
{:catch error}
	<div>{error.message}</div>
{/await}
<ContextMenu bind:this={myMenu}>
	<Item on:click={contextMenuDel}>刪除</Item>
</ContextMenu>
