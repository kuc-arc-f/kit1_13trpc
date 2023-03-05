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
	try{
		const hello = await trpc.hello.query();
		dataHello = hello;
console.log(hello);
		const user = await trpc.userById.query('1');
console.log(user);
		const taskList = await trpc.getTaskList.query();
console.log(taskList);
		const task = await trpc.getTask.query(String(1));
console.log(task);

	} catch (e) {
		console.error(e);
//		throw new Error('Error , startProc');
	}
}
startProc();
/**
 *
 * @param
 *
 * @return
 */ 
 const createTask = async function () {
	try{
console.log("createTask");
		const title = document.querySelector<HTMLInputElement>('#title');
//		const result = await trpc.taskCreate.mutate({ title: 'Hoge456' });
		const result = await trpc.taskCreate.mutate({ title: title?.value });
console.log(result);
		if(result.ret !== 'OK') {
			throw new Error('Error , createTask');
		}
		//@ts-ignore
		title.value = "";
		const taskList = await trpc.getTaskList.query();
		data.userList = taskList;
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<!-- MarkUp -->
<div class="container">
	<h1>tRPC2</h1>
	<hr />
	<div class="col-sm-6">
		<label>Title:</label>
        <input type="text" name="title" id="title" class="form-control"
           />		
		   <button on:click={createTask} class="btn btn-primary my-2">Add</button>
	</div>	
	<hr />
	{#each data.userList as item}
	<div>
		<h3>{item.title}</h3>
		<p>ID : {item.id}</p>
		<a href={`/trpc2/${item.id}`} class="btn btn-outline-primary">Show
		</a>		
		<hr />
	</div>
	{/each}	
</div>

<!--
<hr />
dataHello= {dataHello}
-->