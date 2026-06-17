<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { untrack } from 'svelte';
	import ArtViewer from './ArtViewer.svelte';
	import { artworks, type Artwork } from '$lib/data/artworks';

	let { onWorkOpen, initialWorkId = '' }: { onWorkOpen: (open: boolean) => void; initialWorkId?: string } = $props();

	const initial = untrack(() => initialWorkId ? artworks.find(w => w.id === initialWorkId) ?? null : null);
	let selected = $state<Artwork | null>(initial);
	let galleryEl = $state<HTMLElement>();

	$effect(() => {
		onWorkOpen(selected !== null);
		replaceState(selected ? `/art/${selected.id}` : '/art', { openWindow: 'art' });
	});

	function onKeydown(e: KeyboardEvent) {
		if (selected) return;
		if (e.key === 'ArrowDown') { galleryEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowUp') { galleryEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if selected}
	<ArtViewer artwork={selected} onBack={() => { selected = null; }} />
{:else}
	<div class="gallery" bind:this={galleryEl}>
		<div class="grid">
			{#each artworks as work}
				<button class="work-btn" onclick={() => { selected = work; }}>
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
