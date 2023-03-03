<script>
import { chatData } from './stores';
import { arrData } from './stores';

function addStore() {
	const obj = {name: "name_1"};
	chatData.update(value => obj);
}
//
function addArray() {
	const arr = [
		{id: 1, name: "name_1"},
		{id: 2, name: "name_2"},
	];
	arrData.update(value => arr);
}
</script>

<button on:click={addStore}>Add</button><br />
<button on:click={addArray}>AddArr</button><br />
