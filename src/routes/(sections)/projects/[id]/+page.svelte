<script lang="ts">
	import Scene from '$lib/components/Scene.svelte';
	let { data } = $props();
</script>

<Scene openWindow="projects" initialProjectId={data.projectId} />
