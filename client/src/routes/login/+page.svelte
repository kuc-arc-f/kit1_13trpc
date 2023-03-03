<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation';
import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';
import { PUBLIC_API_URL } from '$env/static/public'
/**
* login
* @param
*
* @return
*/ 
const login = async function () {
    try {
//console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
        const password = document.querySelector<HTMLInputElement>('#password');
        const email = document.querySelector<HTMLInputElement>('#email');
        const item = {
            email: email?.value,
            password: password?.value,
        }
//console.log(item); 
        const res = await fetch(PUBLIC_API_URL + "/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},      
            body: JSON.stringify(item),
        });
        const json = await res.json();
//console.log(json);   
        if (res.status != 200) {
        throw new Error(await res.text());
        }
        if (json.ret != 'OK') {
            alert("Error, login")
            return
        }
        const key = LibConfig.SESSION_KEY_USER;     
console.log(key, json.data);
        const user = json.data;
        user.password = "";
        await LibDbSession.set(key, user);
        goto(`/`);
    } catch (error) {
        console.error(error);
    }  
}
</script>

<!-- MarkUp -->
<div class="container">
    <h1>Login</h1>
    <hr />
    <div class="form-group col-sm-6">
        <label>Email:
        </label><br />
        <input type="text" class="form-control" name="email" id="email" />
        <label>Password:
        </label>
        <input type="password" class="form-control" name="password" id="password" />
    </div>
    <hr />
    <button on:click={login} class="btn btn-primary">Login</button>
    <hr />
    <a href="/users/create">[ User-Create ]
    </a>
    <hr />

</div>

<!--
-->
