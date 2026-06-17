<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { untrack } from 'svelte';
	import AlbumGrid from './AlbumGrid.svelte';
	import AlbumViewer from './AlbumViewer.svelte';
	import { albums, type Album } from '$lib/data/albums';

	let { onAlbumOpen, initialAlbumId = '' }: { onAlbumOpen: (open: boolean) => void; initialAlbumId?: string } = $props();

	const initial = untrack(() => initialAlbumId ? albums.find(a => a.id === initialAlbumId) ?? null : null);
	let selectedAlbum = $state<Album | null>(initial);

	$effect(() => {
		onAlbumOpen(selectedAlbum !== null);
		replaceState(selectedAlbum ? `/photography/${selectedAlbum.id}` : '/photography', { openWindow: 'photography' });
	});
</script>

{#if selectedAlbum}
	<AlbumViewer
		album={selectedAlbum}
		onBack={() => { selectedAlbum = null; }}
	/>
{:else}
	<AlbumGrid onSelect={(album) => { selectedAlbum = album; }} />
{/if}
