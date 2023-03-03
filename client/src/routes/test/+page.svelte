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
</script>

<!-- MarkUp -->
<div class="text-column">
	<h1>Test</h1>
	<hr />
	<form method="POST">
		{#if form?.missing}<p class="error">The email field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}		
		<label>
			Email
			<input name="email" type="email" value={form?.email ?? ''} required>
		</label><br />
		<label>
			Password
			<input name="password" type="password">
		</label><br />
		<hr />
		<button>Log in</button>
	</form>
	{#if form?.success}
		<hr />
		<p>Successfully logged in! Welcome back, name= {form.user.name}</p>
	{/if}
</div>

<!--
-->