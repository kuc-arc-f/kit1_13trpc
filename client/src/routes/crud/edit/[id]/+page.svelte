<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibSqlite from '$lib/LibSqlite';
import LibStorage from '$lib/LibStorage';
import LibConfig from '$lib/LibConfig';
import { PUBLIC_API_URL } from '$env/static/public'

/** @type {import('./$types').PageData} */
export let data: any;
console.log(data);
console.log(data.name);
/**
 * savePost
 * @param
 *
 * @return
 */ 
const savePost = async function () {
	try {
		const name = document.querySelector<HTMLInputElement>('#name');
		const item = {
			name: name?.value,
			content : '',
			id: Number(data.id),
		}
//console.log(item);
		const res = await fetch(PUBLIC_API_URL + "/chats/update", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify(item),
		});      
		const json = await res.json();
		console.log(json);
		if(json.ret !== 'OK'){
			throw new Error('Error , update');
		}
		window.location.href = '/crud'
	} catch (error) {
		console.error(error);
	} 
}
/**
 * deleteItem
 * @param
 *
 * @return
 */ 
async function deleteItem(){
	try {
		let ret = {};
		const item = {
			id: Number(data.id),
		}
	//console.log(item);
console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
		const response = await fetch(PUBLIC_API_URL + "/chats/delete", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify(item),
		});       
		const json = await response.json();
console.log(json.data);
		if(json.ret !== LibConfig.OK_CODE) {
			throw new Error(await response.text());
		}
		ret = json.data;	
		window.location.href = '/crud'
	} catch (error) {
	console.error(error);
	}
}
</script>

<div class="container my-2">
	<a href={`/crud`} class="btn">[ Back ]
	</a>		
	<h1>Edit</h1>
	ID: {data.id}
	<hr />
	<div class="col-sm-6">
		<label>Title:</label>
        <input type="text" name="name" id="name" class="form-control"
		 value= {data.name}  />		
	</div>
	<button on:click={savePost} class="btn btn-primary my-2">Save</button>
	<button on:click={deleteItem} class="btn btn-danger my-2">Delete</button>
</div>
<!--
-->