<script>
	import { createFolder, getBlobs } from '$lib/sdk'

	export let data
	const { _id, parent } = data

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

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
{#await getBlobs({ drive: _id, parent })}
	<div>Loading...</div>
{:then value}
	<pre>{JSON.stringify(value.data, null, 2)}</pre>
{:catch error}
	<div>{error.message}</div>
{/await}
