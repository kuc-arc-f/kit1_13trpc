<script lang="ts">
import { chatData } from './stores';
import { showData } from './stores';
import { arrData } from './stores';
//type
type IChatItem = {
	id: number,
	name : string,
}
export let chatDataValue: IChatItem = {id: 0, name: ""}, arrDataValue: any[]= [];

chatData.subscribe(value => {
	//@ts-ignore
	chatDataValue = value;
	console.log(chatDataValue.name);
});
//showData
showData.subscribe(value => {
	//@ts-ignore
	chatDataValue = value;
	console.log(chatDataValue);
});
arrData.subscribe(value => {
	arrDataValue = value;
	console.log(arrDataValue);
});
</script>

<!-- CSS -->
<style>
#modal_open_button { display: none ;}
</style>
<!--MarkUp  -->
<div>
	<h3>ShowStore</h3>
	<p>name : {chatDataValue.name}
	</p>
	<!-- modal -->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" id="modal_open_button"
     data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
			<p>name : {chatDataValue.name}<br />
				id: {chatDataValue.id}
			</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close
			</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal_end -->	
</div>
