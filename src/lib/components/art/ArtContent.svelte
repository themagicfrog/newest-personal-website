<script lang="ts">
	import ArtViewer from './ArtViewer.svelte';
	import { artworks } from '$lib/data/artworks';
	import type { Artwork } from '$lib/data/artworks';

	let { onWorkOpen }: { onWorkOpen: (open: boolean) => void } = $props();

	let selected = $state<Artwork | null>(null);
</script>

{#if selected}
	<ArtViewer artwork={selected} onBack={() => { selected = null; onWorkOpen(false); }} />
{:else}
	<div class="gallery">
		<h2 class="gallery-heading">works</h2>
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
	}

	.gallery-heading {
		font-size: 1rem;
		margin: 0;
		border-bottom: 1px solid black;
		padding-bottom: 0.4rem;
		flex-shrink: 0;
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
