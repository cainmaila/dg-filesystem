<script>
	import { getBlobs } from '$lib/sdk'

	export let data
	const { _id } = data
</script>

<h1>Drive</h1>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
{#await getBlobs({ drive: _id })}
	<div>Loading...</div>
{:then value}
	<pre>{JSON.stringify(value, null, 2)}</pre>
{:catch error}
	<div>{error.message}</div>
{/await}
