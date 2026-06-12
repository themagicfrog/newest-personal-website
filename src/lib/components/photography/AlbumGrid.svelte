<script lang="ts">
	import { albums, type Album } from '$lib/data/albums';

	let { onSelect }: { onSelect: (album: Album) => void } = $props();

	let gridEl = $state<HTMLElement>();

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') { gridEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowUp') { gridEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="grid" bind:this={gridEl}>
	{#each albums as album}
		<button class="album" onclick={() => onSelect(album)}>
			<div class="cover">
				<img src="/content/photography/{album.id}/{album.photos[0]}" alt={album.title} />
			</div>
			<span class="label">{album.title}</span>
		</button>
	{/each}
</div>

<style>
	.grid {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		justify-content: center;
		padding: 2rem;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.album {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	.cover {
		width: 20vw;
		height: 20vw;
		border: 2px solid black;
		overflow: hidden;
	}

	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.label {
		font-size: 0.85rem;
		text-align: center;
	}
</style>
