<script lang="ts">
	import Stars from "./Stars.svelte";
	import Octo from "./Octo.svelte";
	import MeshGroup from "./Mesh_Group.svelte";
	import Cube from "./Cube.svelte";
</script>

<svelte:options/>


<Stars></Stars>

<div class="scene-container">
	<Octo></Octo>
</div>

<MeshGroup></MeshGroup>

<Cube></Cube>
