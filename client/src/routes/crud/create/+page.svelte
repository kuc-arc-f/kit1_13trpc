<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import { goto } from '$app/navigation';
import { PUBLIC_API_URL } from '$env/static/public'

/** @type {import('./$types').PageData} */
export let data;
console.log(data);

/**
 * start proc
 * @param
 *
 * @return
 */ 
 const startProc = async function () {
	try {
		const validLogin: boolean = await LibAuth.validLogin();
//console.log("#validLogin=" + validLogin);
		if(!validLogin) {
			goto("/login");
		}
	} catch (e) {
      console.error(e);
    }	
}
if(typeof(window) !== "undefined"){
	startProc();
}
/**
 * addPost
 * @param
 *
 * @return
 */ 
const addPost = async function () {
	try{
//console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
		const name = document.querySelector<HTMLInputElement>('#name');
		const url = PUBLIC_API_URL + "/chats/create";
//console.log(url);
		const item = {
		name: name?.value,
		content : '',
		userId:  0,
		}
		const body = JSON.stringify(item);		
		const res = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},      
			body: body
		});
		const json = await res.json()
//console.log(json);   
		if (res.status != 200) {
			throw new Error(await res.text());
		}
		goto(`/crud`);
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<!-- MarkUp -->
<div class="container my-2">
	<a href={`/crud`} class="btn">[ Back ]
	</a>		
	<h1>Create</h1>
	<hr />
	<div class="col-sm-6">
		<label>Name:</label>
        <input type="text" name="name" id="name" class="form-control"
           />		
	</div>
	<button on:click={addPost} class="btn btn-primary my-2">Add</button>
	<hr />
</div>
