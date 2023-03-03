<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation';
import LibAuth from '$lib/LibAuth';

/** @type {import('./$types').PageData} */
export let data: any;
console.log(data);
/** @type {import('./$types').ActionData} */
export let form: any;
console.log(form);
/* 
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
		if(form?.success) {
			goto("/");
		}		
	} catch (e) {
      console.error(e);
    }	
}
if(typeof(window) !== "undefined"){
	startProc();
}
</script>

<!-- MarkUp -->
<div class="text-column">
	<h1>Test2</h1>
	<hr />
	<form method="POST">
		{#if form?.missing}<p class="error">The email field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}		
		<label>
			name
			<input name="name" type="text" value={form?.name ?? ''} required>
		</label><br />
		<hr />
		<button>Save</button>
	</form>
	{#if form?.success}
		<hr />
		<p>Successfully logged in! Welcome back,</p>
	{/if}
</div>

<!--
<input name="email" type="email" required>
<p>Successfully logged in! Welcome back, name= {form.user.name}</p>
-->