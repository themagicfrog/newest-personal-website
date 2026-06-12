<script lang="ts">
	import ArtViewer from './ArtViewer.svelte';
	import { artworks } from '$lib/data/artworks';
	import type { Artwork } from '$lib/data/artworks';

	let { onWorkOpen }: { onWorkOpen: (open: boolean) => void } = $props();

	let selected = $state<Artwork | null>(null);
	let galleryEl = $state<HTMLElement>();

	function onKeydown(e: KeyboardEvent) {
		if (selected) return;
		if (e.key === 'ArrowDown') { galleryEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowUp') { galleryEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if selected}
	<ArtViewer artwork={selected} onBack={() => { selected = null; onWorkOpen(false); }} />
{:else}
	<div class="gallery" bind:this={galleryEl}>
		<div class="grid">
			{#each artworks as work}
				<button class="work-btn" onclick={() => { selected = work; onWorkOpen(true); }}>
					<img
						src="/content/art/works/{work.id}/{work.thumbnail}"
						alt={work.title}
						class="thumb"
						loading="lazy"
					/>
					<span class="work-title">{work.title}</span>
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.gallery {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: 100%;
		overflow-y: auto;
		padding-top: 1.25rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.6rem;
		align-content: start;
	}

	.work-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		text-align: left;
	}

	.thumb {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		display: block;
		border: 1px solid #ddd;
		transition: opacity 0.15s;
	}

	.work-btn:hover .thumb { opacity: 0.85; }

	.work-title {
		font-size: 0.85rem;
		font-style: italic;
	}
</style>
