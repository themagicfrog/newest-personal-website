<script lang="ts">
	import type { Artwork } from '$lib/data/artworks';

	let { artwork, onBack }: { artwork: Artwork; onBack: () => void } = $props();

	let lightboxIndex = $state<number | null>(null);
	let contentEl = $state<HTMLElement>();

	function onKeydown(e: KeyboardEvent) {
		if (lightboxIndex !== null) {
			if (e.key === 'ArrowLeft' && lightboxIndex > 0) { lightboxIndex--; e.preventDefault(); }
			else if (e.key === 'ArrowRight' && lightboxIndex < artwork.photos.length - 1) { lightboxIndex++; e.preventDefault(); }
		} else {
			if (e.key === 'ArrowDown') { contentEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
			else if (e.key === 'ArrowUp') { contentEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="viewer">
	<div class="topbar">
		<button class="back-btn" onclick={onBack}>← works</button>
		<span class="title">{artwork.title}</span>
		{#if artwork.date}<span class="date">{artwork.date}</span>{/if}
	</div>

	<div class="content" bind:this={contentEl}>
		{#if artwork.description}
			<p class="description">{@html artwork.description}</p>
		{/if}
		{#if artwork.link}
			<a href={artwork.link} target="_blank" rel="noopener" class="work-link">view full work →</a>
		{/if}

		<div class="photo-grid">
			{#each artwork.photos as photo, i}
				<button class="photo-btn" onclick={() => lightboxIndex = i}>
					<img
						src="/content/art/works/{artwork.id}/{photo}"
						alt=""
						loading="lazy"
					/>
				</button>
			{/each}
		</div>
	</div>
</div>

{#if lightboxIndex !== null}
	<div class="lightbox" onclick={() => lightboxIndex = null} role="presentation">
		<button class="lightbox-close" onclick={(e) => { e.stopPropagation(); lightboxIndex = null; }}>✕</button>
		<img src="/content/art/works/{artwork.id}/{artwork.photos[lightboxIndex]}" alt="" class="lightbox-img" />
	</div>
{/if}

<style>
	.viewer {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid black;
		flex-shrink: 0;
		gap: 1rem;
	}

	.back-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0;
	}

	.back-btn:hover { text-decoration: underline; }

	.title {
		font-size: 0.85rem;
		font-style: italic;
	}

	.date {
		font-size: 0.75rem;
		opacity: 0.5;
	}

	.content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.75rem;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 4px;
	}

	.photo-btn {
		background: #f0f0f0;
		border: none;
		padding: 0;
		cursor: pointer;
		aspect-ratio: 1;
		overflow: hidden;
	}

	.photo-btn img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: opacity 0.15s;
	}

	.photo-btn:hover img { opacity: 0.85; }

	.description {
		font-size: 0.82rem;
		line-height: 1.6;
		margin: 0;
		white-space: pre-line;
	}

	.description :global(a) { color: black; }

	.work-link {
		font-size: 0.82rem;
		color: black;
	}

	/* Lightbox */
	.lightbox {
		position: absolute;
		inset: 0;
		background: rgba(0,0,0,0.88);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		cursor: pointer;
	}

	.lightbox-close {
		position: absolute;
		top: 0.6rem;
		right: 2.5rem;
		background: none;
		border: none;
		color: white;
		font-size: 1.1rem;
		cursor: pointer;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
