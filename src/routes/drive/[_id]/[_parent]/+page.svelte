<script lang="ts">
	import { createFolder, getBlobs } from '$lib/sdk'

	export let data
	const { _id, parent } = data

	let blobs: I_Blob[] = []

	async function fetchBlobs() {
		const res = await getBlobs({ drive: _id, parent })
		blobs = res.data.blobs
	}

	//@ts-ignore
	async function onCreateBlob(e) {
		e.preventDefault()
		const name = e.target.name.value
		await createFolder({
			parent,
			name
		})
	}
</script>

<h1>Drive</h1>

<form on:submit={onCreateBlob}>
	<input type="text" name="name" placeholder="Name" />
	<button type="submit">POST</button>
</form>

<pre>{JSON.stringify(blobs, null, 2)}</pre>
{#await fetchBlobs()}
	<div>Loading...</div>
{:then}
	{#each blobs || [] as blob}
		<div>
			<a href={`/drive/${_id}/${blob._id}`}>{blob.name}</a>
		</div>
	{/each}
{:catch error}
	<div>{error.message}</div>
{/await}
