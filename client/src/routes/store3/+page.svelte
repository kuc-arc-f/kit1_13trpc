<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { chatData } from './stores';
import { arrData } from './stores';
import { showData } from './stores';
//
import AddStore from './AddStore.svelte';
import ShowStore from './ShowStore.svelte';
//type
type IChatItem = {
	name : string,
}
/** @type {import('./$types').PageData} */
export let data: any;
console.log(data);
//
export let chatDataValue: IChatItem = {name: ""}, arrDataValue: any[]= [],
showDataValue = {};
arrDataValue = data.items;
//
chatData.subscribe(value => {
	chatDataValue = value;
	console.log(chatDataValue.name);
});
const setShowIetm = function(id: number) {
console.log("setShowIetm=", id);
	if(arrDataValue.length > 0) {
		const rows = arrDataValue.filter(item => (item.id === id));
//console.log(arrDataValue[id]);
		const rowOne = rows[0];
		const obj = {
			id: rowOne.id,
			name: rowOne.name
		};
//console.log(obj);
		showData.update(value => obj);
		//modal
		const btn = document.getElementById("modal_open_button");
		btn?.click();		
	}
}
</script>

<!-- MarkUp -->
<div class="container">
	<h3>Store3</h3>
	<hr />
	{#each arrDataValue as item}
	<div>
		<h3>{item.name}</h3>
		<p>ID: {item.id}</p>
		<button on:click={setShowIetm(item.id)} class="btn btn-primary my-2">Show
		</button>
		<hr />
	</div>
	{/each}	
	<hr />
	<ShowStore />
</div>

<!--	
-->