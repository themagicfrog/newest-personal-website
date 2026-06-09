<script lang="ts">
	import AlbumGrid from './AlbumGrid.svelte';
	import AlbumViewer from './AlbumViewer.svelte';
	import type { Album } from '$lib/data/albums';

	let { onAlbumOpen }: { onAlbumOpen: (open: boolean) => void } = $props();

	let selectedAlbum = $state<Album | null>(null);
</script>

{#if selectedAlbum}
	<AlbumViewer
		album={selectedAlbum}
		onBack={() => { selectedAlbum = null; onAlbumOpen(false); }}
	/>
{:else}
	<AlbumGrid onSelect={(album) => { selectedAlbum = album; onAlbumOpen(true); }} />
{/if}
