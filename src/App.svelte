<style>
	@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>

<script lang="ts">
	import Stars from "./Stars.svelte";
	import Octo from "./Octo.svelte";
	import MeshGroup from "./Mesh_Group.svelte";
	import Cube from "./Cube.svelte";

	import Dropdown from 'sv-bootstrap-dropdown';
	let dropdownTrigger;

	// Code only for Replit
	window.process = {
		env: 'production'
	}

  	export let activeComponent = 1;
  	const handleClick = compItem => () => (activeComponent = compItem);
</script>

<svelte:options/>
<!--
<Dropdown triggerElement={dropdownTrigger}>
	<button
		type="button"
		class="btn btn-secondary dropdown-toggle"
		bind:this={dropdownTrigger}
		>
		Dropdown
	</button>
	<div slot="DropdownMenu">
		 <button class="dropdown-item" type="button">Action</button>
		 <button class="dropdown-item" type="button">Another action</button>
		 <button class="dropdown-item" type="button">Something else here</button>
	</div>
</Dropdown>

-->

<Stars></Stars>

<div class="scene-container">
	<Octo></Octo>
</div>

<MeshGroup></MeshGroup>

<Cube></Cube>
