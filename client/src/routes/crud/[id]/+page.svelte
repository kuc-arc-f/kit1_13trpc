<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import LibCommon from '$lib/LibCommon';
import Chat from '../Chat';

//
/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0;
//
console.log("[id]start");
//user = data.user;
console.log(data);
console.log(data.item);
item = data.item;
/**
* init proc: 開始
* @param
*
* @return
*/

</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container my-2">
    <h1>{data.id}</h1>
    ID: {data.id}
    <hr class="my-1" />
    name: {item.name}
</div>

<!--
-->
