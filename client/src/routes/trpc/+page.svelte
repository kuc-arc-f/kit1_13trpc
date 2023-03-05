<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { trpc } from '../../utils/trpc';
import { goto } from '$app/navigation';
import LibAuth from '$lib/LibAuth';

/** @type {import('./$types').PageData} */
export let data: any, dataHello: string = "";
console.log(data.userList);

/**
 * startProc
 * @param
 *
 * @return
 */  
const startProc = async function () {
	const hello = await trpc.hello.query();
	dataHello = hello;
console.log(hello);	
	const user = await trpc.userById.query('1');
	console.log(user);
	const userList = await trpc.getUserList.query();
	console.log(userList);
	//
}
startProc();
/**
 * createUser
 * @param
 *
 * @return
 */ 
 const createUser = async function () {
	try{
		const createdUser = await trpc.userCreate.mutate({ name: 'Hoge123' });
		const userList = await trpc.getUserList.query();
		data.userList = userList;
//		goto(`/crud`);
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<!-- MarkUp -->
<div class="container">
	<h1>tRPC</h1>
	<hr />
	dataHello= {dataHello}
	<hr />
	<button on:click={createUser} class="btn btn-primary my-2">Add</button>
	<hr />
	{#each data.userList as item}
	<div>
		<h3>{item.name}</h3>
		<p>ID : {item.id}</p>
		<hr />
	</div>
	{/each}	
</div>

<!--
-->