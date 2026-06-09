<script lang="ts">
	import type { Album } from '$lib/data/albums';

	let { album, onBack }: { album: Album; onBack: () => void } = $props();

	let lightbox = $state<string | null>(null);
</script>

<div class="viewer">
	<div class="topbar">
		<button class="back-btn" onclick={onBack}>← albums</button>
		<span class="title">{album.title}</span>
		<span class="count">{album.photos.length} photos</span>
	</div>

	<div class="gallery">
		{#each album.photos as photo}
			<button class="thumb-btn" onclick={() => (lightbox = photo)}>
				<img
					src="/content/photography/{album.id}/{photo}"
					alt=""
					class="thumb"
					loading="lazy"
					decoding="async"
				/>
			</button>
		{/each}
	</div>
</div>

{#if lightbox}
	<div class="lightbox" onclick={() => (lightbox = null)} role="presentation">
		<button class="lightbox-close" onclick={(e) => { e.stopPropagation(); lightbox = null; }}>✕</button>
		<img src="/content/photography/{album.id}/{lightbox}" alt="" class="lightbox-img" />
	</div>
{/if}

<style>
	.viewer {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		min-height: 0;
		overflow: hidden;
		position: relative;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid black;
		flex-shrink: 0;
	}

	.title { font-size: 0.85rem; }
	.count { font-size: 0.75rem; opacity: 0.5; }

	.back-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0;
	}

	.back-btn:hover { text-decoration: underline; }

	.gallery {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: calc(92vw / 3);
		gap: 2px;
		padding: 2px;
		align-content: start;
	}

	.thumb-btn {
		width: 100%;
		height: 100%;
		background: #f0f0f0;
		border: none;
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		display: block;
	}

	.thumb {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		transition: opacity 0.15s;
	}

	.thumb-btn:hover .thumb { opacity: 0.85; }

	.lightbox {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
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
		line-height: 1;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
