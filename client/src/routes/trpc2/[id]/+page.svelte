<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import LibCommon from '$lib/LibCommon';
import { trpc } from '../../../utils/trpc';
import { goto } from '$app/navigation';
//
/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0;
//
console.log("[id]start");
console.log(data);
console.log(data.item);
item = data.item;
/**
* init proc: 開始
* @param
*
* @return
*/
const deleteItem = async function() {
	try {
console.log(data.id);
        const task = await trpc.deleteTask.mutate(data.id);
console.log(task);   
        goto("/trpc2");
	} catch (error) {
	console.error(error);
	}    
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container my-2">
    <h1>{data.id}</h1>
    ID: {data.id}
    <hr class="my-1" />
    name: {item.title}
    <hr />
    <button on:click={deleteItem} class="btn btn-danger my-2">Delete</button>
</div>

<!--
-->
