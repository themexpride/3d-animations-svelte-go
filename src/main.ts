import App from './App.svelte';

/*
import Stars from './Stars.svelte';
import Octo from './Octo.svelte';
import MeshGroup from './Mesh_Group.svelte';
import Cube from './Cube.svelte';
*/

const app = new App({
	target: document.getElementById('app'),
	props: {
		name: 'world'
	}
});

/*
const s = new Stars({
	target: document.getElementById('stars'),
	props: {
		name: 'stars'
	}
})

const o = new Octo({
	target: document.getElementById('octo'),
	props: {
		name: 'octo'
	}
})

const m = new MeshGroup({
	target: document.getElementById('mesh'),
	props: {
		name: 'meshgroup'
	}
})

const c = new Cube({
	target: document.getElementById('cube'),
	props: {
		name: 'cube'
	}
})
*/
export default app;